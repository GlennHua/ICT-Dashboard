/**
 *  Get the average GPA for specific JSON course list 
 * 
 *  @param {JSON list} courseJson filtered JSON list, used to get average GPA
 *  @return {number} avgGPA
 */ 

export function averageGPA(courseJson) {
    let avgGpa = 0;
    for (let student of courseJson) {
        avgGpa += student.GpaPoint;
    }
    avgGpa /= courseJson.length;
    // Round the avgGpa to 3 decimal places
    avgGpa = avgGpa.toFixed(3);
    return avgGpa;
}

/**
 *  Get the domestic student number and international student number for specific JSON course list 
 * 
 *  @param {JSON list} courseJson filtered JSON list, used to get the two kinds of student number
 *  @return {number list} domesticStudentNumber and internationalStudentNumber
 */ 

export function domesticInternationalStudent(courseJson) {
    let overseaStudent = courseJson.filter(s => s.ResStatus === 'Overseas');
    let citizenStudent = courseJson.filter(s => s.ResStatus === 'Citizen');
    let NZPRStudent = courseJson.filter(s => s.ResStatus === 'NZ Permanent Resident');
    let domesticStudentNumber = citizenStudent.length + NZPRStudent.length;
    let internationalStudentNumber = overseaStudent.length;
    return [domesticStudentNumber, internationalStudentNumber];
}
