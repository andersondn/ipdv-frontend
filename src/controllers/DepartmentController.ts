import api from "../lib/api";
import { Department } from "../types/departmentTypes";

class DepartmentController {
  async createDepartment(department: Department) {
    const result = await api
      .post("/departments", department)
      .then((response) => ({
        success: true,
        data: response.data,
        message: "Usuário criado com sucesso",
      }))
      .catch((error) => ({
        success: false,
        message:
          error?.response?.data?.validation?.body?.message ||
          error?.response?.data?.message ||
          "Erro ao tentar criar usuário",
      }));

    return result;
  }

  async updateDepartment(departmentId: number, department: Department) {
    const result = await api
      .patch(`/departments/${departmentId}`, department)
      .then((response) => ({
        success: true,
        data: response.data,
        message: "Usuário criado com sucesso",
      }))
      .catch((error) => ({
        success: false,
        message:
          error?.response?.data?.validation?.body?.message ||
          error?.response?.data?.message ||
          "Erro ao tentar atualizar usuário",
      }));

    return result;
  }

    async deleteDepartment(departmentId: number) {
    const result = await api
      .delete(`/departments/${departmentId}`)
      .then((response) => ({
        success: true,
        data: response.data,
        message: "Usuário criado com sucesso",
      }))
      .catch((error) => ({
        success: false,
        message:
          error?.response?.data?.validation?.body?.message ||
          error?.response?.data?.message ||
          "Erro ao tentar deletar usuário",
      }));

    return result;
  }
}
export default DepartmentController;
