import { getUser } from "../controllers/users.js";
import { User } from "../models/User.js";
import { Company } from "../models/Company.js";
import { Person } from "../models/Persons.js";

// Simulación de datos para las pruebas
const mockRequest = (params = {}, headers = {}) => ({
  params,
  headers,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Mock de la función verifyAccessToken
jest.mock("../helpers/generateToken.js", () => ({
  verifyAccessToken: jest.fn(),
}));

describe("getUSER function", () => {
  it("should return user details when valid authorization header and user ID provided", async () => {
    const mockUser = { email: "test@example.com" };
    const mockPerson = {
      national_id: "123456789",
      name: "John",
      last_name: "Doe",
    };

    // Simular datos y comportamientos necesarios para la prueba
    User.findByPk = jest.fn().mockResolvedValue(mockUser);
    Person.findByPk = jest.fn().mockResolvedValue(mockPerson);

    const req = mockRequest(
      { id: "123" },
      { authorization: "Bearer validToken" }
    );
    const res = mockResponse();

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      email: mockUser.email,
      national_id: mockPerson.national_id,
      personName: mockPerson.name,
      personLastName: mockPerson.last_name,
    });
  });
});
