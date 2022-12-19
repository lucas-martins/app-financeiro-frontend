import React from 'react'
import {Layer, Box, Button, Spinner } from 'grommet'
import {Close} from 'grommet-icons'
import { toast } from 'react-toastify';
import { UserContext } from '../../UserContext';

import styles from './RemoveFinancialAccountModal.module.css'

import { removeAccount } from '../../Api';

export const RemoveFinancialAccountModal = ({data, handleRemovingCardModal, setAccountUpdated}) => {
  const {loading, setLoading} = React.useContext(UserContext)

  const handleAccountRemove = async () => {
    setLoading(true)

    const response = await removeAccount(data._id)

    if(response.status === 200) {
      setAccountUpdated(false)
      toast.success(response.data.message);
    } else {
      toast.error(response.error.response.data.message);
    }

    setLoading(false)
    handleRemovingCardModal(false)
  }

  return (
    <Layer
    onEsc={() => handleRemovingCardModal(false)}
    onClickOutside={() => handleRemovingCardModal(false)}
    full="horizontal"
    margin="large"
    hoverIndicator
    className={styles.modalBox}
   >
    <Button 
      icon={<Close />} 
      onClick={() => handleRemovingCardModal(false)}
      className={styles.closeButton}
    />
    <h1 style={{color: '#FF4040'}}>Atenção!</h1>
    <p>
      Ao realizar essa ação todas as informações referentes a essa conta serão removidas desta aplicação.
    </p>
    <p>
      <strong>NÃO</strong> será possível reverter essa operação. 
    </p>
    <p>
    <strong>TEM CERTEZA QUE DESEJA REMOVER ESTA CONTA?</strong>
    </p>
    <Box className="buttonBox" direction="row" justify="between">
        <Button 
          primary
          label={loading ? <Spinner color="#eee" /> : 
          <span>
            Sim, remover
          </span>}
          color="#FF4040"
          style={{width: '40%', display: 'flex', justifyContent: 'center'}}
          onClick={() => handleAccountRemove()}
        />
      </Box>
  </Layer>
  )
}
