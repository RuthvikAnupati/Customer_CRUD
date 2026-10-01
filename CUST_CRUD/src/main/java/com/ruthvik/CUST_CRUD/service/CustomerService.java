package com.ruthvik.CUST_CRUD.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ruthvik.CUST_CRUD.exception.ResourceNotFoundException;
import com.ruthvik.CUST_CRUD.model.Customer;
import com.ruthvik.CUST_CRUD.repository.CustomerRepo;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepo customerRepo;


    // Get all customers
    public List<Customer> getAllCustomers() {
        return customerRepo.findAll();
    }


    // Get customer by ID
    public Customer getCustomerById(Integer cid) {

        return customerRepo.findById(cid)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Customer not found with id: " + cid
                    )
                );
    }

    // Create customer
    public Customer createCustomer(Customer customer) {
        return customerRepo.save(customer);
    }


    // Update customer
    public Customer updateCustomer(Integer cid, Customer customer) {

    	Customer existingCustomer =
    	        customerRepo.findById(cid)
    	        .orElseThrow(() ->
    	            new ResourceNotFoundException(
    	                "Customer not found with id: " + cid
    	            )
    	        );

        existingCustomer.setCname(customer.getCname());
        existingCustomer.setProductName(customer.getProductName());
        existingCustomer.setPrice(customer.getPrice());
        existingCustomer.setQuantity(customer.getQuantity());

        return customerRepo.save(existingCustomer);
    }


    // Delete customer
    public void deleteCustomer(Integer cid) {

        Customer existingCustomer =
                customerRepo.findById(cid)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Customer not found with id: " + cid
                    )
                );

        customerRepo.delete(existingCustomer);
    }

    // Pagination
    public Page<Customer> getCustomersWithPagination(
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        return customerRepo.findAll(pageable);
    }
}