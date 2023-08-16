import React, { useState, useEffect } from 'react';

function Profile() {
    return (
        <main className='profile'>

            <h1 className="profile__title">{`Привет, ${"Андрей"}!`}</h1>
            <form className="profile__form" name="profile" noValidate>
                <div className="profile__input-container">
                    <label className="profile__label">
                        <span className="profile__label-text">Имя</span>
                        <input
                            name="name"
                            className='profile__input'
                            defaultValue={"Андрей"}
                            type="text"
                            required
                            minLength="2"
                            maxLength="30"
                            pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
                        />
                    </label>
                    <label className="profile__label">
                        <span className="profile__label-text">E-mail</span>
                        <input
                            name="email"
                            className='profile__input'
                            defaultValue={"andreydochkin@yandex.ru"}
                            type="email"
                            required
                        />
                    </label>

                </div>

                <div className="profile__buttons">
                    <button
                        type="submit"
                        className='profile__button-edit'
                    >
                        Редактировать
                    </button>
                    <button
                        type="submit"
                        className="profile__button-exit">
                        Выйти из аккаунта
                    </button>
                    {/* <div className='profile__error'>При обновлении профиля произошла ошибка.</div> */}
                    {/* <button
                        type="submit"
                        className="profile__button-save">
                        Сохранить
                    </button> */}
                </div>
            </form>
        </main>
    );
}

export default Profile;