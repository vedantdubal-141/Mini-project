Dimezis BlurView GitHub Repository: https://github.com/Dimezis/BlurView
Expo BlurView Documentation: https://docs.expo.dev/versions/v54.0.0/sdk/blur-view/


# Smart Survey — Dev Notes & How It Was Built

A readable, beginner-friendly walkthrough of everything we did to build this app — design decisions, code tricks, and lessons learned.

---

## 1. Choosing the Design Theme

We started with a **Neobrutalism** concept (bold borders, black/white), but decided it felt too harsh. We then explored a few alternatives:

| Theme | Vibe | Why we skipped it |
|---|---|---|
| Neobrutalism | Bold borders, raw look | Too rough |
| Skeuomorphism | Looks like real objects | Old-fashioned |
| Neumorphism | Soft inset shadows | Hard to read |
| **Monochrome Glassmorphism** ✅ | Frosted glass, iOS-style | Clean and modern |

**Monochrome Glassmorphism** won. It's the style used in iOS — white/translucent cards that blur the background behind them, soft borders, and minimal color.

---

## 2. Background Wallpaper Setup

We wanted a beautiful blurry background that shows through all tabs — like a phone wallpaper.

### The trick: put `ImageBackground` *above* the Tabs

Instead of adding a background to each screen, we wrap the entire `<Tabs>` navigator inside an `<ImageBackground>`. This way every screen automatically has the wallpaper behind it.

```jsx
// app/(tabs)/_layout.jsx
export default function TabLayout() {
  return (
    <ImageBackground source={require('../../assets/images/bg.jpg')} style={{ flex: 1 }}>
      <Tabs screenOptions={{ sceneStyle: { backgroundColor: 'transparent' } }}>
        {/* tabs here */}
      </Tabs>
    </ImageBackground>
  );
}
```

> **Key:** `sceneStyle: { backgroundColor: 'transparent' }` makes every tab screen transparent so the wallpaper shows through from below.

---

## 3. The Floating Bottom Tab Bar

We turned the standard bottom nav bar into a floating pill — like iOS 26.

```jsx
tabBarStyle: {
  position: 'absolute', // float it
  bottom: 25,           // lift it up from the edge
  left: 20,
  right: 20,
  height: 65,
  borderTopWidth: 0,    // remove the default line on top
  elevation: 0,         // remove Android shadow
  backgroundColor: 'transparent',
},
tabBarShowLabel: false, // icons only, no text
```

The bar itself is transparent — the frosted glass look comes from a custom background component (`TabBarBlur`) described next.

---

## 4. The Blur Effect (and Why It's Complicated)

This is where it gets interesting. We use `expo-blur`'s `<BlurView>` to create the frosted glass.

### How it works

```jsx
import { BlurView } from 'expo-blur';

<BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
```

- **`intensity`** — how strong the blur is (0-100). We use 40 — enough to be visible, not too milky.
- **`tint`** — color overlay. `"light"` gives a white-ish frost.
- **`style={StyleSheet.absoluteFill}`** — stretches it to fill the parent, placed behind everything else.

### The Android Problem ⚠️

> **Important:** `expo-blur` on Android does **NOT** actually blur by default. It just shows a semi-transparent overlay — which looks milky/foggy, not frosted.

The fix is to enable the experimental blur engine:

```jsx
<BlurView
  intensity={40}
  tint="light"
  experimentalBlurMethod="dimezisBlurView"  // ← the magic line
  blurReductionFactor={2}
  style={StyleSheet.absoluteFill}
/>
```

- **`experimentalBlurMethod="dimezisBlurView"`** — uses the [BlurView by Dimezis](https://github.com/Dimezis/BlurView) library, which does real native blur on Android.
- **`blurReductionFactor={2}`** — Android's blur is stronger than iOS at the same intensity, so we divide it by 2 to match.

> ⚠️ The Expo docs label this as *experimental*. It works great but may cause performance issues on very old or budget Android devices.

### The Web Problem 🌐

CSS `backdrop-filter: blur()` only works if there is something rendered *below* the element. React Native for Web renders `<ImageBackground>` in a way that breaks this compositing, so the blur looks distorted/glitchy on desktop browsers.

**Our solution:** On web, skip the background photo entirely and use a plain clean background:

```jsx
if (Platform.OS === 'web') {
  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      {/* tabs */}
    </View>
  );
}

// Native gets the photo
return (
  <ImageBackground source={require('./bg.jpg')}>
    {/* tabs */}
  </ImageBackground>
);
```

This way, web users get a clean UI and native users get the full glassmorphism look.

---

## 5. The `GlassCard` Component

All cards in the app use a shared `GlassCard` component. Here is the full code with explanation:

```jsx
// components/GlassCard.js
import { BlurView } from 'expo-blur';
import { StyleSheet, View, Platform } from 'react-native';

export default function GlassCard({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      {/* BlurView only on native (web uses CSS backdropFilter) */}
      {Platform.OS !== 'web' && (
        <BlurView
          intensity={40}
          tint="light"
          experimentalBlurMethod="dimezisBlurView"
          blurReductionFactor={2}
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',          // clips the blur inside the rounded corners
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,              // subtle white border = glass edge
    backgroundColor: 'rgba(255,255,255,0.15)', // thin white film
    // CSS blur for web browsers
    ...(Platform.OS === 'web'
      ? { backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }
      : {}),
  },
  content: { padding: 16 },
});
```

**Why `overflow: 'hidden'`?**
The `BlurView` is placed with `absoluteFill` (it fills 100% of the parent). Without `overflow: hidden`, the blur would bleed outside the card's rounded corners.

**Why `backgroundColor: rgba(255,255,255,0.15)`?**
A very thin white film. This helps the card look "frosted" even when the blur isn't strong, and ensures it always has some contrast against dark backgrounds.

---

## 6. Removing the Top Bar

The app originally used a `Drawer` navigator (the hamburger menu), which forced a white header bar at the top of every screen.

We replaced it with a `Stack` navigator and hid the header:

```jsx
// app/_layout.jsx — BEFORE
import { Drawer } from 'expo-router/drawer';
<Drawer screenOptions={{ headerTitle: 'Smart Survey' }}>

// app/_layout.jsx — AFTER
import { Stack } from 'expo-router';
<Stack screenOptions={{ headerShown: false }}>
```

This completely removes the white bar so the wallpaper fills the entire screen from edge to edge.

---

## 7. Fixing Tab Icon Alignment

The default React Native tab bar places the icon slightly above center because it reserves space for a label even when labels are hidden. Fix: push the icon down with `marginTop`.

```jsx
tabBarIcon: ({ color }) => (
  <Ionicons name="home" size={24} color={color} style={{ marginTop: 12 }} />
)
```

---

## 8. The Ghost Tab Bug

When we removed the "Menu" tab from `_layout.jsx`, a 4th broken icon still appeared because `menu.jsx` still existed in the `(tabs)` folder. Expo Router automatically creates a tab for every file in a `(tabs)` directory — even if you don't list it in `_layout.jsx`.

**Fix:** Delete the orphan file.
```bash
rm 'app/(tabs)/menu.jsx'
```

**Lesson:** Always delete old screen files when removing tabs, or the router will auto-add them.

---

## 9. Module 5: Contacts

We installed `expo-contacts` to access the device address book.

```bash
npx expo install expo-contacts
```

```jsx
import * as Contacts from 'expo-contacts';

// Always ask for permission first
const { status } = await Contacts.requestPermissionsAsync();

if (status === 'granted') {
  const { data } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.PhoneNumbers],
    sort: Contacts.SortTypes.FirstName,
  });
  // data is an array of contacts
}
```

Key features built:
- `requestPermissionsAsync()` — asks for permission, shows an empty state if denied
- `getContactsAsync()` — fetches all contacts, sorted by first name
- Search: filtering the local `contacts` array client-side (fast, no extra API call)
- Pull-to-Refresh: using `<FlatList refreshControl={<RefreshControl />}>`
- Avatars: generating 2-letter initials from `contact.name`
- "No Number" fallback: checking if `contact.phoneNumbers` is empty

---

## 10. Module 6: Clipboard

We use `expo-clipboard` for all copy/paste actions.

```bash
npx expo install expo-clipboard
```

```jsx
import * as Clipboard from 'expo-clipboard';

// Copy a string
await Clipboard.setStringAsync('some text');

// Paste — read from clipboard
const text = await Clipboard.getStringAsync();

// Clear clipboard
await Clipboard.setStringAsync('');
```

Where each feature lives:

| Feature | Screen |
|---|---|
| Copy Contact Number | `contacts.jsx` — tap the copy icon next to any contact |
| Copy Survey ID | `index.jsx` — "Copy Survey ID" quick action button |
| Copy Current Location | `location.jsx` — "Copy Location" button |
| Paste Notes | `create.jsx` — "Paste Notes" button above the Description field |
| Clear Clipboard Data | `create.jsx` — "Clear Clipboard Data" button at the bottom |

---

## Summary: Cross-Platform Cheat Sheet

| Feature | iOS | Android | Web |
|---|---|---|---|
| Background photo | ✅ Full | ✅ Full | ❌ Plain `#f0f0f0` |
| `BlurView` blur | ✅ Native | ⚠️ `dimezisBlurView` (experimental) | ❌ CSS `backdrop-filter` |
| CSS `backdrop-filter` | ❌ N/A | ❌ N/A | ✅ Works |
| Contacts | ✅ | ✅ | ❌ No device contacts on web |
| Clipboard | ✅ | ✅ | ✅ (browser clipboard API) |
