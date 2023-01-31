# Main.py class
# Date: 19/01/2022
# Author: Thabiso Matsaba

from ast import main
from Desk import Desk
from Employee import Employee
from Floor import Floor

employees = {
    1: Employee(1, "Thabiso Matsaba"),
    2: Employee(2, "Tiyani Baloyi"),
    3: Employee(3, "Sam Twum")
}

floors = {
    1: Floor(1, "First Floor"),
    2: Floor(2, "Second Floor"),
    3: Floor(3, "Third Floor")
}

desks = {
    1: Desk("A1", floors[1]),
    2: Desk("A2", floors[1]),
    3: Desk("A3", floors[2]),
    4: Desk("B1", floors[2]),
    5: Desk("B2", floors[3]),
    6: Desk("B3", floors[3])

}

# Function to check in an employee to a desk


def check_in(employee_id, desk_id):
    employee = employees[employee_id]
    desk = desks[desk_id]
    if not desk.occupied:
        employee.assigned_desk = desk
        desk.occupied = True
        desk.occupant = employee
        print(
            f'{employee.name} checked in to desk {desk.location}. on floor {desk.floor.floor_name}')
        print(f'-------------------------------------------------------------------')
        return True
    else:
        print(
            f'Desk {desk.location}  on floor {desk.floor.floor_name} is already occupied.')
        print(f'-------------------------------------------------------------------')
        return False

# Function to check out an employee from a desk


def check_out(employee_id,):
    employee = employees[employee_id]
    desk = employee.assigned_desk
    if employee.assigned_desk:
       desk = employee.assigned_desk
       
       print(
            f'{employee.name} checked out of desk {desk.location} on floor {desk.floor.floor_name}.')
       print(f'-------------------------------------------------------------------')
       return True
    else:
        print(f'{employee.name} is not currently assigned to a desk.')
        print(f'-------------------------------------------------------------------')
        return False


# Function to check the occupancy of a floor


def check_floor(floor_id):
    floor = floors[floor_id]
    occupied_desks = [
        desk.location for desk in floor.desks.values() if desk.occupied]
    print(f'Occupied desks on floor {floor.floor_name} are: {occupied_desks}')
    print(f'-------------------------------------------------------------------')
    available_desks = [
        desk.location for desk in floor.desks.values() if not desk.occupied]
    print(f'Available desks on floor {floor.floor_name} are: {available_desks}')
    print(f'-------------------------------------------------------------------')


while True:
    action = input(
        "What would you like to do? (check-in, check-out, check-floor, exit): ")
    if action == "check-in":
        employee_id = int(input("Enter your employee ID: "))
        desk_id = int(input("Enter the desk ID you want to check in to: "))
        check_in(employee_id, desk_id)
    elif action == "check-out":
        employee_id = int(input("Enter your employee ID: "))
        check_out(employee_id)
    elif action == "check-floor":
        floor_id = int(input("Enter the floor ID you want to check in to: "))
        check_floor(floor_id)
    elif action == "exit":
        break
    else:
        print("Invalid input. Please enter a valid action.")

if __name__ == "__main__":
    main()
