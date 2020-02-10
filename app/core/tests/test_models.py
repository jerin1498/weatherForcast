from django.test import TestCase
from django.contrib.auth import get_user_model


class ModelTest(TestCase):

    def test_create_user_email_successful(self):
        email = 'jerin@gmail.com'
        password = 'happyhappy'
        User = get_user_model()
        user = User.objects.create_user(email=email)
        user.set_password(password)
        user.save()

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        '''test for email in small letter'''
        email = 'test@LONDONAPPDEV.COM'
        user = get_user_model().objects.create_user(email, 'test123')

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        '''test creating email with no user name'''
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None, 'test14')


    def test_creating_new_super_user(self):
        '''test creating a new superuser'''

        user = get_user_model().objects.create_superuser('test@LONDONAPPDEV.COM', 'testhdf')

        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)


