import React, { useState } from 'react';
import { useToast } from 'hooks/useToast';
import SoundPlayer from 'react-native-sound-player';
import ResponseCode from 'network/ResponseCode';
import RecordingAPI, { AuthApis } from 'network/subs/auth/recording/RecordingAPI';
import { store } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetStorageWord } from 'network/subs/auth/recording/RecordingRequest';
import RNFetchBlob from 'rn-fetch-blob';

export const useLogicJoinWord = () => {

    const showToast = useToast();
    const MAX_IMAGE_WIDTH = 480;
    const MAX_IMAGE_HEIGHT = 480;
    const IMAGE_QUALITY = 60;
    const [image, setImage] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [id, setID] = React.useState(" ");
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([{}])
    const [words, setWords] = React.useState([])
    const addWord = (item: any, index: any) => {

        // console.log(item?.pictureFiledId)
        if (words.length <= 5) {
            setWords([...words, { ...item }])
            let temp = data.filter(value => value.word != item?.word)
            setData([...temp])
            // dispatch(add(item))
            if (id) {
                setID(id + "," + item?.audioWord)
                // console.log('if---'+id)
            }
            else {
                setID(item?.audioWord)
                // console.log('el---'+id)

            }

            // console.log(data)

        }
        else {
            showToast('Quá số lượng từ cho phép!', 'warning');
        }
    }
    const deleteWord = (item: any) => {
        let temp = words.filter(value => value.word != item?.word)
        setWords([...temp])
        setData([...data, { ...item }])

        if (id.length > 1) {
            // let count= item?.audioWord.length
            // let tempId = id.indexOf(`,${item?.audioWord}`)
            // console.log(count)
            // // console.log(id.slice(tempId,0))
            // setID(id.slice(tempId,0))
            let index = id.indexOf(`${item?.audioWord}`)
            let a = item?.audioWord
            let indexs = a.length
            let strs = id.slice(0, index) + id.slice(index + indexs + 1)
            let newStr = strs.trim()
            if (newStr.charAt(newStr.length - 1) == ',') {
                newStr = newStr.slice(0, newStr.length - 1)
            }

            // console.log(newStr);

            setID(newStr)

        }
    }
    const [isStop, setIsStop] = React.useState('play')
    const playSimpleSound = async (id) => {
        let filePath = '';
        let url = AuthApis.GetVoice + encodeURIComponent(id)
        await RNFetchBlob.config({
            fileCache: true,
            appendExt: 'mp3',
        })
            .fetch("GET", url, {
                Authorization: store.getState().authReducer.user.accessToken,
                'Accept': '*/*',
                'Content-Type': 'application/octet-stream'
            })
            .then((res) => {
                console.log(res);
                // console.log("The file saved to ", res.path())
                // console.log("The file saved to ", res.path());
                filePath = res.path();
                SoundPlayer.playUrl('file://' + filePath);
            })
    }
    const [ids, setIds] = useState('')
    const playSound = async () => {
        console.log(id)
        if (id === '') {
            showToast('Hãy cho từ vào khu ghép từ', 'warning')
            setStop(false)
        }

        if (id) {
            if (!stop) {
                setStop(true)


                try {
                    // or play from url
                    playSimpleSound(id)

                } catch (e) {
                    console.log(`cannot play the sound file`, e)
                }


            } else {
                setStop(false)
                SoundPlayer.stop()
            }

        }
        // setStop(!stop)

        SoundPlayer.addEventListener('FinishedPlaying', ((res) => {

            if (res) {
                setStop(false)
                // console.log('success')

            }
        }))


    }
    const dispatch = useDispatch()
    const handleStore = useSelector(store => store.storeReducer.handleStore)
    const getStorageWords = async (values: any) => {

        const response = await RecordingAPI.GetStorageWord<GetStorageWord>({
            data: {}

        })
        if (response.status === ResponseCode.SUCCESS) {
            // console.log(response.data)
            setData(response.data)
            // dispatch(getdata(response.data))

        }

    }


    return {
                id,
                setID,
                stop,
                setStop,
                data,setData,
                words,setWords,
                addWord,
                deleteWord,
                isStop,
                setIsStop,
                playSimpleSound,
                playSound,
                getStorageWords,

    }

}