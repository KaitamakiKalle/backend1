
export class Student {
    // konstruktorimetodi joka rakentaa student-olion
    constructor(
        public _id: string, // mongon lisäämä _id
        public studentcode: string,
        public name: string,
        public email: string,
        public studypoints: number,
        public grades: Array<{}>) { }
}
