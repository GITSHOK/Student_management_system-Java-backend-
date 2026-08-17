package com.example.studentSpring.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.studentSpring.service.StudentService;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import java.util.Optional;

import com.example.studentSpring.model.Student;


@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;
    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @PostMapping()
    public Student addStudent(@RequestBody Student student){
        return studentService.addStudent(student);
    }

    @GetMapping()
    public List<Student> getAllStudent(){
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Optional<Student> getStudentById(@PathVariable String id){
        return studentService.getStudentById(id);
    }
    @DeleteMapping("/deleteStudent/{id}")
    public ResponseEntity<Map<String, String>> deleteStudent(@PathVariable String id){
        studentService.deleteStudentById(id);
        return ResponseEntity.ok(Map.of("message","Succesfully deleted"));
    }
    @PutMapping("/updateStudent/{id}")
    public Student updateStudent(@PathVariable String id,@RequestBody Student student){
        return studentService.updateStudent(id, student);

    }

}