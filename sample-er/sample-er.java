public class Employee {

    private Long id;
    private String name;
    private Integer salary;
    private Company company;

    public Long getId() {
        return id;
    }

    public Long setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String setName(String name) {
        this.name = name;
    }

    public Integer getSalary() {
        return salary;
    }

    public Integer setSalary(Integer salary) {
        this.salary = salary;
    }

    public Company getCompany() {
        return company;
    }

    public Company setCompany(Company company) {
        this.company = company;
    }

}

public class Company {

    private Long id;
    private String name;
    private LocalDate fundationDate;
    @Nullable
    private BigDecimal moneyAmount;
    private List<Employee> employees;

    public Long getId() {
        return id;
    }

    public Long setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String setName(String name) {
        this.name = name;
    }

    public LocalDate getFundationDate() {
        return fundationDate;
    }

    public LocalDate setFundationDate(LocalDate fundationDate) {
        this.fundationDate = fundationDate;
    }

    public BigDecimal getMoneyAmount() {
        return moneyAmount;
    }

    public BigDecimal setMoneyAmount(BigDecimal moneyAmount) {
        this.moneyAmount = moneyAmount;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public List<Employee> setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

}
