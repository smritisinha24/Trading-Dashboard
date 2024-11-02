package com.CME.tradingdashboard.repository;

import com.CME.tradingdashboard.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {
    List<Company> findBySymbolIgnoreCase(String symbol);
}
