// Först bearbetar vi kursinformation
function processData(courses, teachersMap) {
  const outputElement = document.getElementById("output");
  const template = document.getElementById("template-course");

  outputElement.innerHTML = ""; // Tömmer outputElement

  // Sedan loopar vi igenom varje kurs
  courses.forEach(course => {
    const clone = template.content.cloneNode(true);

    // Fyller i kursinformation
    clone.querySelector(".course-name").textContent = course.courseName;
    clone.querySelector(".course-id").textContent = `Course ID: ${course.courseId}`;
    clone.querySelector(".credit").textContent = `Credit: ${course.credit}`;
    clone.querySelector(".school").textContent = `School: ${course.school}`;
    clone.querySelector(".start-week").textContent = `Start Week: ${course.startWeek}`;
    clone.querySelector(".end-week").textContent = `End Week: ${course.endWeek}`;

    // Efter det hämtar vi och fyller i lärarens namn baserat på lärar-ID
    const teachersNames = course.teachers.map(teacherId => teachersMap.get(teacherId)).join(", ");
    clone.querySelector(".teachers").textContent = `Teachers: ${teachersNames}`;

    outputElement.appendChild(clone);
  });
}

// Vi hämtar kursinformation från API:et
fetch('https://artificial-guru.github.io/courses.json')
  .then(response => response.json())
  .then(coursesData => {
    // Ochj hämtar lärarinformation från API:et
    fetch('https://artificial-guru.github.io/teachers.json')
      .then(response => response.json())
      .then(teachersData => {
        // Spara lärarinformationen
        const teachersMap = new Map();
        teachersData.forEach(teacher => {
          teachersMap.set(teacher.id.name, `${teacher.name.first} ${teacher.name.last}`);
        });

        // Bearbeta kursinformation med hjälp av lärarinformationen
        processData(coursesData, teachersMap);
      });
  });