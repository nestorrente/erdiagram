public class Person {

    private Long id;
    private String name;
    private City city;
    private City alternativeCity;

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

    public City getCity() {
        return city;
    }

    public City setCity(City city) {
        this.city = city;
    }

    public City getAlternativeCity() {
        return alternativeCity;
    }

    public City setAlternativeCity(City alternativeCity) {
        this.alternativeCity = alternativeCity;
    }

}

public class City {

    private Long id;
    private String code;
    private String name;

    public Long getId() {
        return id;
    }

    public Long setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public String setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public String setName(String name) {
        this.name = name;
    }

}
