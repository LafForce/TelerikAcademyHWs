﻿using System;

class FormatNumber
{
    static void Main()
    {
        Console.WriteLine(@"Problem 11. Format number
Write a program that reads a number and prints it as a decimal number, 
hexadecimal number, percentage and in scientific notation.
Format the output aligned right in 15 symbols.
============================================================================
Solution:");

        Console.Write("Enter an integer: ");
        int number = int.Parse(Console.ReadLine());

        Console.WriteLine("{0,15}", number);
        Console.WriteLine("{0,15:X}", number);
        Console.WriteLine("{0,15:P}", number / 100.0);
        Console.WriteLine("{0,15:E}", number);
    }
}
