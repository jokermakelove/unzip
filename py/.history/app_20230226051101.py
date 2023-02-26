import sqlite3
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QHBoxLayout, QLabel, QLineEdit, QPushButton

class MainWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle('Gmail Account Manager')

        self.email_label = QLabel('Email:')
        self.email_edit = QLineEdit()

        self.password_label = QLabel('Password:')
        self.password_edit = QLineEdit()

        self.recovery_email_label = QLabel('Recovery Email:')
        self.recovery_email_edit = QLineEdit()

        self.phone_label = QLabel('Phone:')
        self.phone_edit = QLineEdit()

        self.save_button = QPushButton('Save')
        self.save_button.clicked.connect(self.save_account)

        self.layout = QVBoxLayout()
        self.layout.addWidget(self.email_label)
        self.layout.addWidget(self.email_edit)
        self.layout.addWidget(self.password_label)
        self.layout.addWidget(self.password_edit)
        self.layout.addWidget(self.recovery_email_label)
        self.layout.addWidget(self.recovery_email_edit)
        self.layout.addWidget(self.phone_label)
        self.layout.addWidget(self.phone_edit)

        self.h_layout = QHBoxLayout()
        self.h_layout.addStretch()
        self.h_layout.addWidget(self.save_button)

        self.layout.addLayout(self.h_layout)

        self.setLayout(self.layout)

    def save_account(self):
        email = self.email_edit.text()
        password = self.password_edit.text()
        recovery_email = self.recovery_email_edit.text()
        phone = self.phone_edit.text()

        conn = sqlite3.connect('
