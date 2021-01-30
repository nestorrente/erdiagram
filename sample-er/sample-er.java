public class User {

    private Long id;
    private String username;
    private String name;
    @Nullable
    private LocalDate birthday;
    private Boolean active;
    private Country country;
    @Nullable
    private Country alternativeCountry;
    private List<Permission> permissions;
    private List<User> follows;
    private List<User> followers;

    public Long getId() {
        return id;
    }

    public Long setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public String setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public String setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public LocalDate setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public Boolean getActive() {
        return active;
    }

    public Boolean setActive(Boolean active) {
        this.active = active;
    }

    public Country getCountry() {
        return country;
    }

    public Country setCountry(Country country) {
        this.country = country;
    }

    public Country getAlternativeCountry() {
        return alternativeCountry;
    }

    public Country setAlternativeCountry(Country alternativeCountry) {
        this.alternativeCountry = alternativeCountry;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public List<Permission> setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }

    public List<User> getFollows() {
        return follows;
    }

    public List<User> setFollows(List<User> follows) {
        this.follows = follows;
    }

    public List<User> getFollowers() {
        return followers;
    }

    public List<User> setFollowers(List<User> followers) {
        this.followers = followers;
    }

}

public class Country {

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

public class Permission {

    private Long id;
    private String code;
    private String description;
    private List<User> users;

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

    public String getDescription() {
        return description;
    }

    public String setDescription(String description) {
        this.description = description;
    }

    public List<User> getUsers() {
        return users;
    }

    public List<User> setUsers(List<User> users) {
        this.users = users;
    }

}
