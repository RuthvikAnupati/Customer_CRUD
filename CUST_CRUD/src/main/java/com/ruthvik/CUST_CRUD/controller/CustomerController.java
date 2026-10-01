package com.ruthvik.CUST_CRUD.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ruthvik.CUST_CRUD.model.Customer;
import com.ruthvik.CUST_CRUD.service.CustomerService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    @Autowired
    private CustomerService customerService;


    // =========================
    // GET ALL CUSTOMERS
    // ADMIN + USER
    // =========================

    @GetMapping("/getCustList")
    public List<Customer> getAllCustomers() {

        return customerService.getAllCustomers();
    }


    // =========================
    // GET CUSTOMER BY ID
    // ADMIN + USER
    // =========================

    @GetMapping("/getCust/{cid}")
    public Customer getCustomer(
            @PathVariable Integer cid) {

        return customerService.getCustomerById(cid);
    }


    // =========================
    // PAGINATION
    // ADMIN + USER
    // =========================

    @GetMapping("/getCustListPage")
    public Page<Customer> getCustomersWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return customerService.getCustomersWithPagination(
                page,
                size
        );
    }


    // =========================
    // CREATE CUSTOMER
    // ADMIN ONLY
    // =========================

    @PostMapping("/createCust")
    public Customer createCustomer(
            @RequestBody Customer customer) {

        return customerService.createCustomer(customer);
    }


    // =========================
    // UPDATE CUSTOMER
    // ADMIN ONLY
    // =========================

    @PutMapping("/updateCust/{cid}")
    public Customer updateCustomer(
            @PathVariable Integer cid,
            @RequestBody Customer customer) {

        return customerService.updateCustomer(
                cid,
                customer
        );
    }


    // =========================
    // DELETE CUSTOMER
    // ADMIN ONLY
    // =========================

    @DeleteMapping("/delCust/{cid}")
    public String deleteCustomer(
            @PathVariable Integer cid) {

        customerService.deleteCustomer(cid);

        return "Customer deleted successfully";
    }
}