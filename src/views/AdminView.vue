<script setup lang="ts">
import { onMounted } from "vue";
import { useAdminStore } from "@/app/stores/adminStore";

const adminStore = useAdminStore();

onMounted(() => {
  adminStore.fetchUsers();
  adminStore.fetchChats();
});

const handleBan = async (userId: number, isBanned: boolean) => {
  await adminStore.banUser(userId, !isBanned);
};

const handleClearHistory = async (chatId: string) => {
  if (confirm("Вы уверены, что хотите очистить историю сообщений этого чата?")) {
    await adminStore.clearHistory(chatId);
    alert("История очищена");
  }
};
</script>

<template>
  <div class="admin-panel">
    <h1>Админ Панель</h1>

    <section>
      <h2>Пользователи</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Логин</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Статус</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in adminStore.users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.login }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.isBanned ? "Забанен" : "Активен" }}</td>
            <td>
              <button @click="handleBan(user.id, user.isBanned)">
                {{ user.isBanned ? "Разбанить" : "Забанить" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Чаты</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Тип</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chat in adminStore.chats" :key="chat.id">
            <td>{{ chat.id }}</td>
            <td>{{ chat.type }}</td>
            <td>
              <button @click="handleClearHistory(chat.id)">Очистить историю</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.admin-panel {
  padding: 20px;
  color: white;
  background: #2c2f33;
  min-height: 100vh;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  margin-bottom: 30px;
}
th,
td {
  border: 1px solid #444;
  padding: 10px;
  text-align: left;
}
th {
  background: #23272a;
}
button {
  background: #7289da;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}
button:hover {
  background: #677bc4;
}
</style>
