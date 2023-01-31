# Hash table or Hash map is a type of data structure that maps keys to its value pairs 

    HahshFunction            index      Value

    Key1    --->              0         Value1

    Key2    --->              1         Value2

    Key3    --->              3         Value3

# Lets create an employee Dictionary

``` py

employees = {
    1: Employee(1, "Thabiso Matsaba"),
    2: Employee(2, "Tiyani Baloyi"),
    3: Employee(3, "Sam Twum")
}

```
# Lets perform operations on Hash Table

``` py

### Prints the keys associated with the an employee

print(employees.keys())

### Prints the values associated with an employee

print(employees.values())

### Prints the value associated with an employee

print(employees.get('Thabiso'))

### Use for loop to print keys 

for e in employees:
    print(e)

### Use for loop to print values

for e in employees.values():
    print(e)

````









[Link to my info in this readme.md!](readme.me)




