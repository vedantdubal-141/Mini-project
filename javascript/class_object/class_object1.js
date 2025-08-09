/*

class Student {
    constructor(name, marks) {
        this.name = name;
        this.marks = marks;
    }

    hello() {
        console.log("method");
    }

    get_name() {
        console.log(this.name);
    }
}

var obj1 = new Student("Dev", 82);
obj1.hello();
obj1.get_name();
obj1.get_marks();

*/

/*

class Person {
    constructor(name) {
        this.name = name;
    }
}

class Student extends Person {
    constructor(name, branch) {
        super(name);
        this.branch = branch;
    }
}

var obj1 = new Student("Dev", "CSE");
console.log(obj1.name);
console.log(obj1.branch);*/


// multi level inhertance

class Person {
    constructor(name, cgpa) {
        this.name = name;
        this.cgpa = cgpa;
    }
}

class Student extends Person {
    constructor(name, branch, age, cgpa) {
        super(name, cgpa);
        this.branch = branch;
        this.age = age;
    }
}

class Three extends Student {
    constructor(name, branch, age, cgpa, date) {
        super(name, branch, age, cgpa); // Note: 'super' call should be without the trailing semicolon in real code
        this.date = date;
    }
}

var obj1 = new Three("Dev", "CSE", 25, 8.2, 12);
console.log(obj1.name);      // Outputs: Dev
console.log(obj1.branch);   // Outputs: CSE
console.log(obj1.age);      // Outputs: 25
console.log(obj1.cgpa);    // Outputs: 8.2 (assuming cgpa is passed correctly from Person)
console.log(obj1.date);     // Outputs: 12

