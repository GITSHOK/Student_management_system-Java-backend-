package com.example.studentSpring.repository;

import com.example.studentSpring.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<Student, String> {
}