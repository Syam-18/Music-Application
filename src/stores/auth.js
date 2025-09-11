import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "@/services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const error = ref(null);
  const loading = ref(false);

  // Signup
  const signup = async (email, password) => {
    loading.value = true;
    error.value = null;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Login with Email/Password
  const login = async (email, password) => {
    loading.value = true;
    error.value = null;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Login with Google OAuth
  const loginWithGoogle = async () => {
    loading.value = true;
    error.value = null;

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" }); // force account selection

    try {
      const result = await signInWithPopup(auth, provider);
      // result.user contains the logged-in user
      console.log("Google Login Success:", result.user);
    } catch (err) {
      console.error("Google Login Error:", err);
      error.value = err;
      // Provide more detailed error messages
      if (err.code === "auth/invalid-credential") {
        alert("Invalid Google credentials. Check Firebase configuration and authorized domains.");
      } else if (err.code === "auth/popup-closed-by-user") {
        alert("Login popup closed by user.");
      } else if (err.code === "auth/cancelled-popup-request") {
        alert("Popup request cancelled. Try again.");
      } else {
        alert(err.message);
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Logout
  const logout = async () => {
    loading.value = true;
    error.value = null;
    try {
      await signOut(auth);
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Track logged-in user
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
  });

  return {
    user,
    error,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
  };
});
