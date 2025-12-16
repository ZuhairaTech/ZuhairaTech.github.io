validNum = False  # Boolean flag to control the loop

while validNum == False:
    number = int(input("Please enter a number between 1 and 10: "))

    if number >= 1 and number <= 10:
        validNum = True  # Condition met → stop loop

print("You have entered:", number)