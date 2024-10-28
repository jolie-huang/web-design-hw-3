document.getElementById('addRow').addEventListener('click', function () {
    let table = document.getElementById('gpaTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="checkbox" class="select-row"></td>
        <td><input type="text" class="course-name" placeholder="Course Name"></td>
        <td>
            <select class="grade">
                <option value="4.0">A+</option>
                <option value="4.0">A</option>
                <option value="3.7">A-</option>
                <option value="3.3">B+</option>
                <option value="3.0">B</option>
                <option value="2.7">B-</option>
                <option value="2.3">C+</option>
                <option value="2.0">C</option>
                <option value="1.7">C-</option>
                <option value="1.3">D+</option>
                <option value="1.0">D</option>
                <option value="0.7">D-</option>
                <option value="0.0">F</option>
            </select>
        </td>
        <td><input type="text" class="credits" placeholder="Credits"></td>
        <td><button class="delete-row">X</button></td>
    `;

    // Add delete functionality to the new row
    newRow.querySelector('.delete-row').addEventListener('click', function () {
        newRow.remove();
    });
});

// Event listener for the "Calculate" button
document.getElementById('calculate').addEventListener('click', function () {
    let rows = document.querySelectorAll('#gpaTable tbody tr');
    let totalGradePoints = 0;
    let totalCredits = 0;

    rows.forEach(row => {
        let checkbox = row.querySelector('.select-row');
        let grade = parseFloat(row.querySelector('.grade').value);
        let credits = parseFloat(row.querySelector('.credits').value);

        // Only include rows where the checkbox is checked and values are valid numbers
        if (checkbox.checked && !isNaN(grade) && !isNaN(credits)) {
            totalGradePoints += grade * credits;
            totalCredits += credits;
        }
    });

    // Calculate GPA and display the result
    let gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    document.getElementById('result').textContent = `GPA: ${gpa}`;
});

// Event listener for the "Reset" button
document.getElementById('reset').addEventListener('click', function () {
    let rows = document.querySelectorAll('#gpaTable tbody tr');
    rows.forEach(row => {
        row.querySelector('.select-row').checked = false;
        row.querySelector('.grade').value = "4.0"; // Default to A+ or another default value
        row.querySelector('.credits').value = "";
        row.querySelector('.course-name').value = "";
    });
    document.getElementById('result').textContent = '';
});

// Initial delete functionality for rows that are already present in the HTML
document.querySelectorAll('.delete-row').forEach(button => {
    button.addEventListener('click', function () {
        this.parentElement.parentElement.remove();
    });
});
