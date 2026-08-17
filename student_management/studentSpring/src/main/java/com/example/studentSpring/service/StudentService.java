package com.example.studentSpring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.studentSpring.model.Student;
import com.example.studentSpring.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student addStudent(Student student){
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(String id){
        return studentRepository.findById(id);
    }
    public void deleteStudentById(String id){
        studentRepository.deleteById(id);
    }
    public Student updateStudent(String id,Student newStudent){
        Optional<Student> optionalStudent = studentRepository.findById(id);

        if(optionalStudent.isPresent()){
            Student existingStudent = optionalStudent.get();

            existingStudent.setClassroom(newStudent.getClassroom());
            existingStudent.setName(newStudent.getName());
            existingStudent.setRoll(newStudent.getRoll());
            existingStudent.setYear(newStudent.getYear());

            return studentRepository.save(existingStudent);
        }


        return null;


    }

}
