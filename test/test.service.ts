import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcryptjs from 'bcryptjs';
import { Address, Contact, User } from 'generated/prisma';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deleteAddress();
    await this.deleteContact();
    await this.deleteUser();
  }

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async getUser(): Promise<User> {
    return (await this.prismaService.user.findUnique({
      where: {
        username: 'test',
      },
    })) as User;
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'test',
        name: 'Test',
        password: await bcryptjs.hash('test1234', 10),
        token: 'test-token',
      },
    });
  }

  async createContact() {
    await this.prismaService.contact.create({
      data: {
        first_name: 'test',
        last_name: 'test',
        email: 'test@example.com',
        phone: '9999',
        username: 'test',
      },
    });
  }

  async getContact(): Promise<Contact> {
    return (await this.prismaService.contact.findFirst({
      where: {
        username: 'test',
      },
    })) as Contact;
  }

  async deleteContact() {
    await this.prismaService.contact.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async deleteAddress() {
    await this.prismaService.address.deleteMany({
      where: {
        contact: {
          username: 'test',
        },
      },
    });
  }

  async createAddress() {
    const contact = await this.getContact();
    await this.prismaService.address.create({
      data: {
        contact_id: contact.id,
        street: 'test',
        city: 'test',
        province: 'test',
        country: 'test',
        postal_code: '1111',
      },
    });
  }

  async getAddress(): Promise<Address> {
    return (await this.prismaService.address.findFirst({
      where: {
        contact: {
          username: 'test',
        },
      },
    })) as Address;
  }
}
