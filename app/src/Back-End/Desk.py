# Desk.py class
# Date: 19/01/2022
# Author: Thabiso Matsaba

class Desk:
    def __init__(self, location, floor):
        self.location = location
        self.floor = floor
        self.occupied = False
        self.occupant = None
        floor.desks[location] = self
