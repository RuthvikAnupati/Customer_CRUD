package com.ruthvik.CUST_CRUD.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ruthvik.CUST_CRUD.model.Customer;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Integer> {

}