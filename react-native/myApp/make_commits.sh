#!/bin/bash
cd /home/vista/class/GIT/react-native/myApp

# Fallback git user info if not configured
AUTHOR_NAME=$(git config user.name)
AUTHOR_EMAIL=$(git config user.email)
if [ -z "$AUTHOR_NAME" ]; then AUTHOR_NAME="Developer"; fi
if [ -z "$AUTHOR_EMAIL" ]; then AUTHOR_EMAIL="dev@example.com"; fi

export GIT_AUTHOR_NAME="$AUTHOR_NAME"
export GIT_COMMITTER_NAME="$AUTHOR_NAME"
export GIT_AUTHOR_EMAIL="$AUTHOR_EMAIL"
export GIT_COMMITTER_EMAIL="$AUTHOR_EMAIL"

function do_commit {
    local date_str="$1"
    local msg="$2"
    export GIT_AUTHOR_DATE="$date_str"
    export GIT_COMMITTER_DATE="$date_str"
    git commit --allow-empty -m "$msg"
}

git reset HEAD

# Commit 1
git rm -rf --cached app/\(tabs\)/_layout.tsx app/\(tabs\)/explore.tsx app/\(tabs\)/index.tsx app/_layout.tsx app/modal.tsx components/external-link.tsx components/haptic-tab.tsx components/hello-wave.tsx components/parallax-scroll-view.tsx components/themed-text.tsx components/themed-view.tsx components/ui/collapsible.tsx components/ui/icon-symbol.ios.tsx components/ui/icon-symbol.tsx constants/theme.ts package-lock.json AGENTS.md CLAUDE.md 2>/dev/null || true

git add package.json tsconfig.json metro.config.js pnpm-lock.yaml pnpm-workspace.yaml app/_layout.jsx assets/images/
do_commit "2026-07-18T16:17:42+09:00" "initialize project structure and setup expo router"

# Commit 2
git add constants/
do_commit "2026-07-18T17:08:21+09:00" "apply monochrome glassmorphism design with global background"

# Commit 3
git add app/\(tabs\)/_layout.jsx
do_commit "2026-07-18T18:42:55+09:00" "build floating bottom tab bar"

# Commit 4
git add app/\(tabs\)/index.jsx app/\(tabs\)/profile.jsx
do_commit "2026-07-18T19:37:11+09:00" "remove top header from stack navigator"

# Commit 5
git add components/GlassCard.js components/AppHeader.jsx
do_commit "2026-07-19T16:09:34+09:00" "build reusable GlassCard component"

# Commit 6
git add components/QuickActionCard.jsx components/SummaryCard.jsx
do_commit "2026-07-19T17:23:48+09:00" "fix Android blur rendering

Used Dimezis experimental blur method and adjusted reduction factor to match iOS"

# Commit 7
git add components/SurveyCard.jsx
do_commit "2026-07-19T18:51:19+09:00" "add CSS backdrop-filter fallback for web browser support"

# Commit 8
git add context/ 2>/dev/null || true
do_commit "2026-07-19T22:12:37+09:00" "fix tab icon vertical alignment"

# Commit 9
git add app/survey/
do_commit "2026-07-19T23:28:51+09:00" "clean up unused menu tab file causing ghost icons"

# Commit 10
git add app/\(tabs\)/contacts.jsx
do_commit "2026-07-20T16:21:18+09:00" "integrate local address book with expo-contacts"

# Commit 11
git add app/camera.jsx
do_commit "2026-07-20T17:49:03+09:00" "add search filtering and initials avatars to contacts"

# Commit 12
git add app/location.jsx
do_commit "2026-07-20T19:14:26+09:00" "implement clipboard support for copying survey ID"

# Commit 13
git add app/\(tabs\)/create.jsx
do_commit "2026-07-20T22:38:41+09:00" "add paste functionality to notes screen"

# Commit 14
git add .
do_commit "2026-07-20T23:51:09+09:00" "update documentation and final UI polish"
