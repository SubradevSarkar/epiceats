"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let loginBtn_lg = elementId("login-btn-lg");
  let logoutBtn_lg = allSelector(".logoutBtn");
  let profileMenu_lg = elementId("profile-menu-lg");

  // handel profile update function logic =================================================================
  const profileForm = allSelector(".profile-form");
  const profileInfo = allSelector(".profile-info");
  const profileEditBtn = allSelector(".profile-edit-btn");
  const profileEditCancelBtn = allSelector(".profile-edit-cancel-btn");
  const profileUpdateBtn = allSelector(".profile-update-btn");
  const profileDisableBtn = elementId("profile-disable-btn");
  const profilePasswordChangeBtn = elementId("change-password-btn");
  const profilePasswordConBox = elementId("change-password-con-box");
  const profilePasswordConCancelBtn = elementId(
    "change-password-con-cancel-btn"
  );

  const sendOtp = async (email) => {
    const formData = new FormData(email);
    const data = new URLSearchParams(formData);

    try {
      const res = await fetch(`${baseUrl}/user/send-otp`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return await res.json();
    } catch (error) {
      throw new Error(error.message);
    }

    // fetch  then/catch() sample =================================================

    // fetch(`${baseUrl}/user/send-otp`, {
    //   method: "POST",
    //   body: data,
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       return res.json().then((errData) => {
    //         console.log(errData);
    //         throw new Error(errData.message);
    //       });
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     showToastMessage({
    //       message: data.message,
    //       type: "warning",
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(111, err);
    //   });
  };

  const updateProfile = async (form) => {
    const formData = new FormData(form);
    const data = JSON.stringify(Object.fromEntries(formData));
    // const data = new URLSearchParams(formData);

    let apiEndpoint =
      form.name === "resetPasswordForm" ? "password-reset" : "profile-update";

    try {
      const res = await fetch(`${baseUrl}/user/${apiEndpoint}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  if (profileEditBtn) {
    profileEditBtn.forEach((button, index) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        profileForm.forEach((form, formIndex) => {
          if (formIndex !== index) {
            form.classList.add("d-none");
            profileInfo[formIndex].classList.remove("d-none");

            const input = form.querySelector("input");
            input.value = input.defaultValue;

            const saveButton = profileUpdateBtn[formIndex];
            if (saveButton) {
              saveButton.disabled = true;
            }
          }
        });

        if (button.id === "change-password-con-btn") {
          const loader = profilePasswordConBox.querySelectorAll("div")[0];
          loader.classList.remove("d-none");
          profilePasswordConBox.style.opacity = ".2";
          sendOtp()
            .then((res) => {
              loader.classList.add("d-none");
              profilePasswordConBox.style.opacity = "1";
              profilePasswordConBox.classList.add("d-none");
              profileForm[index].classList.remove("d-none");

              showToastMessage({
                message: res.message,
                type: "warning",
              });
            })
            .catch((error) => {
              loader.classList.add("d-none");
              profilePasswordConBox.style.opacity = "1";
              showToastMessage({
                message: error.message,
                type: "danger",
              });
            });
        } else {
          profileInfo[index].classList.add("d-none");
          profileForm[index].classList.remove("d-none");
        }
      });
    });
  }

  if (profileEditCancelBtn) {
    profileEditCancelBtn.forEach((button, index) => {
      button.addEventListener("click", () => {
        profileInfo[index].classList.remove("d-none");
        const form = profileForm[index];
        form.classList.add("d-none");
        if (form.name === "resetPasswordForm") {
          const input = form.querySelectorAll("input");
          input.forEach((field, index) => {
            field.value = "";
          });
        } else {
          const input = form.querySelector("input");
          input.value = input.defaultValue;
        }

        const saveButton = profileUpdateBtn[index];
        if (saveButton) {
          saveButton.disabled = true;
        }
      });
    });
  }

  if (profileForm) {
    profileForm.forEach((form, formIndex) => {
      form.addEventListener("input", (e) => {
        e.preventDefault();

        // const saveButton = form.querySelectorAll("button")[1]; // alternative to using
        const saveButton = profileUpdateBtn[formIndex];

        if (form.name === "resetPasswordForm") {
          const input = form.querySelectorAll("input");
          if (
            input[0].value === "" ||
            input[1].value === "" ||
            input[2].value === ""
          ) {
            saveButton.disabled = true;
          } else {
            saveButton.disabled = false;
          }
        } else {
          const input = form.querySelector("input");
          if (input.value.trim() !== input.defaultValue) {
            saveButton.disabled = false;
          } else {
            saveButton.disabled = true;
          }
        }
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const saveButton = profileUpdateBtn[formIndex];

        if (!saveButton.disabled) {
          // form.submit();
          loader.show();
          updateProfile(form)
            .then(() => {
              loader.hide();
              location.reload();
            })
            .catch((err) => {
              loader.hide();
              window.location.reload();
            });
        }
      });
    });
  }

  if (profilePasswordChangeBtn) {
    profilePasswordChangeBtn.addEventListener("click", () => {
      profilePasswordConBox.classList.remove("d-none");
      profilePasswordChangeBtn.parentElement.classList.add("d-none");
    });
  }

  if (profilePasswordConCancelBtn) {
    profilePasswordConCancelBtn.addEventListener("click", () => {
      profilePasswordConBox.classList.add("d-none");
      profilePasswordChangeBtn.parentElement.classList.remove("d-none");
    });
  }

  if (logoutBtn_lg) {
    logoutBtn_lg.forEach((button, index) => {
      button.addEventListener("click", () => {
        fetch(`${baseUrl}/user/logout`, {
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.redirect) {
              window.location.href = data.redirect;
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    });
  }

  // if (profileDisableBtn) {
  //   profileDisableBtn.addEventListener("click", () => {
  //     showToastMessage({
  //       message: "👋 bye bye",
  //     });
  //   });
  // }
});
