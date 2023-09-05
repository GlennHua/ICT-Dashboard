import React, { useEffect } from 'react'
import { parse } from 'papaparse'
import catClose from '../../Asset/cat-close.png'
import catOpen from '../../Asset/cat-open.png'
import { importCSV } from '../../Request/FileStreamRequest'
import styles from './ImportCSV.module.css' //import css module

export default function ImportCSV() {
  const [highlighted, setHighlighted] = React.useState(false)
  const [message, setMessage] = React.useState('FEED ME A CSV!')
  const [disableDrop, setDisableDrop] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    })
    window.addEventListener('drop', (e) => {
      e.preventDefault();
    })
    return () => {
      window.removeEventListener('dragover', (e) => {
        e.preventDefault();
      })
      window.removeEventListener('drop', (e) => {
        e.preventDefault();
      })
    }
  }, [])
  const handleDrop = (e) => {
    e.preventDefault()
    if(isLoading) return
    setHighlighted(false)
    if(e.dataTransfer.files[0].type  != 'text/csv') {
      let fileFormat = getFileFormat(e.dataTransfer.files[0].type)
      setMessage(`DON'T GIVE ME ${fileFormat.toUpperCase()}`)
    }else{
      setDisableDrop(true)
      setIsLoading(true)
      setMessage('NOM NOM NOM NOM')
      Array.from(e.dataTransfer.files)
        .filter((file) => file.type === 'text/csv')
        .forEach(async (file) => {
          const text = await file.text()
          const config = {
            header: true,
            transformHeader: (header) => header.replace(/\s/g, ''),
          };
          
          const result = parse(text, config);
          getImportCSV(result.data).then(res => {setIsLoading(false);setDisableDrop(false);setMessage('GOOD!')})
        })
    }
  }

  const getFileFormat = (mimeType)=> {
    return mimeType.split('/').pop().split('.').pop();
  }

  const getImportCSV = async (recieve) => {
    let {data} = await importCSV(recieve)
    return data
  }

  return (
      <div  style={{width:'100%', display:'flex',justifyContent: 'center'}}>
        <div
        className={styles.catContainer + ' ' + (isLoading ? styles.catContainerOpen : '')}
          style={{
            width: '45vh',
            height: '45vh',
            margin: '5vh 5vh',
            border: 'dashed',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '2rem',
            fontFamily: 'fantasy',
            color: 'black',
            backgroundColor: highlighted||disableDrop ? 'lightgray' : 'white',
            borderRadius: '10px',
            backgroundImage: `url(${highlighted ? catOpen : catClose})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            cursor: disableDrop && 'no-drop',
          }}
          onDragEnter={(e) => {
            if(isLoading) return
            setHighlighted(true)
          }}
          onDragLeave={(e) => {
            setHighlighted(false)
          }}
          onDragOver={(e) => {
            e.preventDefault()
          }}
          onDrop={disableDrop ? null :((e) => handleDrop(e))}
        >
          {message}
        </div>
      </div>
  )
}
