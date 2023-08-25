import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Profile({ onSignOut, onEdit, editModeError }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    const currentUser = useContext(CurrentUserContext);

    const [editMode, setEditMode] = useState(false);

    function handleEditOneClick() {
        setEditMode(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onEdit(values.name, values.email);
        currentUser.name = values.name;
        currentUser.email = values.email;
        setEditMode(false);
    }

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true);
        }
    }, [currentUser, resetForm, editMode]);

    return (
        <main className='profile'>

            <h1 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h1>
            <form onSubmit={handleSubmit} className="profile__form" name="profile" noValidate>
                <div className="profile__input-container">
                    <label className="profile__label">
                        <span className="profile__label-text">Имя</span>
                        <input
                            name="name"
                            type="text"
                            className='profile__input'
                            value={values.name || ''}
                            onChange={handleChange}
                            minLength="2"
                            maxLength="30"
                            required
                            disabled={!editMode ? true : false}
                        />
                    </label>
                    <label className="profile__label">
                        <span className="profile__label-text">E-mail</span>
                        <input
                            name="email"
                            type="email"
                            className='profile__input'
                            value={values.email || ''}
                            onChange={handleChange}
                            required
                            disabled={!editMode ? true : false}
                        />
                    </label>

                </div>

                <div className="profile__buttons">
                    {!editMode ?
                        <>
                            <button
                                type="submit"
                                className='profile__button-edit'
                                onClick={handleEditOneClick}
                            >
                                Редактировать
                            </button>
                            <button
                                type="submit"
                                className="profile__button-exit"
                                onClick={onSignOut}>
                                Выйти из аккаунта
                            </button>

                        </>
                        :
                        <>
                            <div className='profile__error'>{editModeError || ''}</div>
                            <button
                                type="submit"
                                className={`profile__button-save ${!isValid && 'profile__button-save_disabled'}`}
                            >
                                Сохранить
                            </button>
                        </>
                    }

                </div>
            </form>
        </main>
    );
}

export default Profile;