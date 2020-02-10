from django.test import TestCase

from .calc import add, subtract


class CalcTest(TestCase):

    def test_add_numbers(self):
        self.assertEqual(add(5, 5), 10)

    def test_subtract_numbers(self):
        self.assertEqual(subtract(5, 3), 2)
