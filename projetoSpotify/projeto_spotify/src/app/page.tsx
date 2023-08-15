
import Modal from './components/Modal/Modal';
import React from 'react';
import Text from './components/Modal/Text/page';
import Button from './components/Modal/Button/page';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-fixed bg-gradient-to-tl from-green-400 to-blue-500" >
      <Modal>
        <Text/>
        <Button  required={true} userTerms={'termos de uso  *'} buttonImg={'PngItem_263635.png'} buttonText={'conecte-se'} />
      </Modal>
    </main>
  )
}