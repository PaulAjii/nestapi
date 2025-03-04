import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
          "id": 1,
          "name": "Alice Johnson",
          "email": "alice.johnson@example.com",
          "role": "ENGINEER"
        },
        {
          "id": 2,
          "name": "Bob Smith",
          "email": "bob.smith@example.com",
          "role": "ADMIN"
        },
        {
          "id": 3,
          "name": "Charlie Brown",
          "email": "charlie.brown@example.com",
          "role": "INTERN"
        },
        {
          "id": 4,
          "name": "Diana Ross",
          "email": "diana.ross@example.com",
          "role": "ENGINEER"
        },
        {
          "id": 5,
          "name": "Evan Davis",
          "email": "evan.davis@example.com",
          "role": "INTERN"
        },
        {
          "id": 6,
          "name": "Fiona Gallagher",
          "email": "fiona.gallagher@example.com",
          "role": "ADMIN"
        },
        {
          "id": 7,
          "name": "George Miller",
          "email": "george.miller@example.com",
          "role": "ENGINEER"
        },
        {
          "id": 8,
          "name": "Hannah Wilson",
          "email": "hannah.wilson@example.com",
          "role": "INTERN"
        },
        {
          "id": 9,
          "name": "Ian Martinez",
          "email": "ian.martinez@example.com",
          "role": "ENGINEER"
        },
        {
          "id": 10,
          "name": "Julia Roberts",
          "email": "julia.roberts@example.com",
          "role": "ADMIN"
        }
    ]
      
    findAll(role?: "INTERN" | "ENGINEER" | "ADMIN") {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)

            if (rolesArray.length === 0) throw new NotFoundException("User role not found")

            return rolesArray
        }

        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if (!user) throw new NotFoundException("User not found")

        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)

        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {...user, ...updateUserDto}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)

        this.users.filter(user => user.id !== id)

        return removedUser
    }
}
