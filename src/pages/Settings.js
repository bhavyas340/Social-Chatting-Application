import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import style from '../styles/Settings.module.css';
 
const Settings= ()=>{
    const auth = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(auth.user? auth.user.name:'');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [savingForm, setSavingForm] = useState(false);
    const { addToast } = useToasts();


    const clearForm =  ()=>{
      setPassword('');
      setConfirmPassword('');
    }
    const updateProfile = async ()=>{
        setSavingForm(true);
        
        let error = false;
        if(!name || !password || !confirmPassword){
          addToast('Please Fill all the fields',{
            appearance: 'error',
          })
          error = true;
        }

        if(password !== confirmPassword){
          addToast('Password and Confirm Password does not match',{
            appearance: 'error'
          });
          error = true;
        }
        if(error){
          return setSavingForm(false)
        }

        const response = await auth.updateUser(
          auth.user._id,
          name,
          password,
          confirmPassword
        );

        console.log('settings response', response);
        if(response.success){
          setEditMode(false);
          setSavingForm(false);
          clearForm();
          
          return addToast('User Updated Successfully',{
            appearance: 'success'
           })
        }else{
          addToast(response.message ,{
            appearance: 'error'
           })

        }

        setSavingForm(false);
    }
    return (
      <div className={style.settings}>
        <div className={style.imgContainer}>
          <img
            src="https://highxtar.com/wp-content/uploads/2020/07/highxtar-apple-new-emojis-2-1024x1024.png"
            alt=""
          />
        </div>

        <div className={style.field}>
          <div className={style.fieldLabel}>Email</div>
          <div className={style.fieldValue}>{auth.user?.email}</div>
        </div>

        <div className={style.field}>
          <div className={style.fieldLabel}>Name</div>
          {editMode ? (
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          ) : (
            <div className={style.fieldValue}>{auth.user?.name}</div>
          )}
        </div>

        {editMode && (
          <>
            <div className={style.field}>
              <div className={style.fieldLabel}>Password</div>
              <input 
                type="password" 
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                 />
            </div>

            <div className={style.field}>
              <div className={style.fieldLabel}>Confirm Password</div>
              <input
                type="password" 
                value={confirmPassword}
                onChange={(e)=>{setConfirmPassword(e.target.value)}} />
            </div>
          </>
        )}

        <div className={style.btnGrp}>
          {editMode ?
          (<>
            <button className={`button ${style.saveBtn}`} onClick={updateProfile} disabled={savingForm}>
                {savingForm ? 'Saving Profile...':'Save Profile'}
            </button>
            <button className={`button ${style.editBtn}`} onClick={()=>setEditMode(false)}>
                Go back
            </button>
          </>)
          :(
            <button className={`button ${style.editBtn}`} onClick={()=>{setEditMode(true)}}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    );
};

export default Settings;