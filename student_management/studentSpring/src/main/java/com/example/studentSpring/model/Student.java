package com.example.studentSpring.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "students")
public class Student {
    
    @Id
    private String id;

    private String name;
    private int roll;
    private String classroom;
    private int year;


    public Student(){

    }

    public Student(String name, int roll,String classroom,int year){
        this.name=name;
        this.roll=roll;
        this.classroom=classroom;
        this.year = year;
    }

    public String getId(){
        return id;
    }

    public String getName() {
        return name;
    }

    public int getRoll() {
        return roll;
    }

    public String getClassroom() {
        return classroom;
    }

    public int getYear() {
        return year;
    }

    public void setId(String id) {
        this.id = id;
    }

     public void setName(String name) {
        this.name = name;
    }

    public void setRoll(int roll) {
        this.roll = roll;
    }

    public void setClassroom(String classroom) {
        this.classroom = classroom;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
