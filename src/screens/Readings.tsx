import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Modal,
    ImageBackground,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const Readings = () => {
    const [selected, setSelected] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [isInsertCodeModalVisible, setIsInsertCodeModalVisible] = useState(false);
    const [numberClient, setNumberClient] = useState('');
    const [lastCapture, setLastCapture] = useState('');
    const [newCapture, setNewCapture] = useState('');
    const [difference, setDifference] = useState('');
    const [liters, setLiters] = useState('');
    const [address, setAddress] = useState('');
    const [complex, setComplex] = useState('');
    const [interior, setInterior] = useState('');
    const [debt, setDebt] = useState('');
    const cameraRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImageURI, setCapturedImageURI] = useState<string | null>(null);

    const data = [
        { key: '1', value: 'CONDOMINIO AZTECAS' },
        { key: '2', value: 'CONDOMINIO LA CANTERA TORRE C' },
        { key: '3', value: 'CONDOMINIO LA CANTERA TORRE A' },
        { key: '4', value: 'CONDOMINIO LA CANTERA TORRE B' },
        { key: '5', value: 'PUNTO CENTRAL TORRE 1' },
    ];

    const headers = ['Direction', 'Reading', 'Inside', 'No. Client'];
    const rows = [
        ['CONDOMINIO AZTECA TORRE A 01', ' ', '01', '424'],
        ['CONDOMINIO AZTECA TORRE A 02', ' ', '02', '425'],
        ['CONDOMINIO AZTECA TORRE A 03', ' ', '03', '426'],
        ['CONDOMINIO AZTECA TORRE A 04', ' ', '05', '427'],
    ];

    const onFilterChange = (text: React.SetStateAction<string>) => {
        setFilterText(text);
    };

    const filteredRows = rows.filter(
        (row) =>
            row[2].includes(filterText) || row[3].includes(filterText)
    );

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const showInsertCodeModal = () => {
        setIsInsertCodeModalVisible(true);
    };

    const hideInsertCodeModal = () => {
        setIsInsertCodeModalVisible(false);
    };

    const openCamera = () => {
        setIsCameraOpen(true);
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const { uri } = await (cameraRef.current as RNCamera).takePictureAsync();
                setIsCameraOpen(false);

                // Abre la pantalla de recorte de imagen
                ImagePicker.openCropper({
                    path: uri,
                    width: 300,
                    height: 400,
                    mediaType: 'photo',
                    cropping: true,
                    cropperCircleOverlay: false,
                    cropperToolbarTitle: 'Recortar imagen',
                    freeStyleCropEnabled: true,
                    includeBase64: true,
                }).then((croppedImage) => {
                    if (croppedImage) {
                        setCapturedImageURI(croppedImage.path);

                        // Obtén y establece el texto reconocido en "New Capture"
                        ObtenerTexto(croppedImage.path);
                    }
                });
            } catch (error) {
                console.error('Error al tomar la foto:', error);
            }
        }
    };

    const ObtenerTexto = async (imageUri: string) => {
        try {
            const result = await TextRecognition.recognize(imageUri);
            console.log('Texto reconocido:', result.text);
            const onlyNumbers = result.text.replace(/\D/g, '');

            setNewCapture(onlyNumbers);
        } catch (error) {
            console.error('Error al obtener el texto:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Title}>Readings</Text>
            <View style={styles.selectSwitchContainer}>
                <SelectList
                    setSelected={setSelected}
                    data={data}
                    save="value"
                    dropdownStyles={{
                        backgroundColor: 'white',
                        width: 200,
                        position: 'absolute',
                        top: 75,
                        zIndex: 1,
                    }}
                    dropdownTextStyles={{
                        color: 'black',
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 5,
                        textAlign: 'center',
                    }}
                    boxStyles={{
                        backgroundColor: 'white',
                        width: 200,
                        marginTop: 40,
                        marginStart: 2,
                    }}
                    inputStyles={{ color: 'black', textAlign: 'center' }}
                    placeholder="Select option"
                />
                <View style={styles.switchContainer}>
                    <Switch
                        value={isEnabled}
                        onValueChange={setIsEnabled}
                        trackColor={{ false: 'red', true: 'green' }}
                    />
                    <Text style={styles.switchText}>Offline</Text>
                </View>
            </View>
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.buttonFilter}>
                    <Text style={styles.buttonText}>Filter</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.filterInput}
                    placeholder="Filter"
                    placeholderTextColor={'black'}
                    value={filterText}
                    onChangeText={onFilterChange}
                />
                <TouchableOpacity style={styles.buttonCapture} onPress={showModal}>
                    <Text style={styles.buttonTextCapture}>Capture</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 25 }}>
                <Table borderStyle={{ borderWidth: 1 }}>
                    <Row
                        data={headers}
                        style={{
                            backgroundColor: 'gray',
                        }}
                        height={40}
                        flexArr={[1, 1, 1, 1, 1]}
                        textStyle={{ textAlign: 'center', color: 'black' }}
                    />
                    <TableWrapper>
                        <Rows
                            data={filteredRows}
                            textStyle={{ color: 'black', textAlign: 'center', fontSize: 11 }}
                        />
                    </TableWrapper>
                </Table>
            </View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={hideModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Reading Capture</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
                            <Text style={styles.modalButtonText}>Scan Code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={showInsertCodeModal}>
                            <Text style={styles.modalButtonText}>Insert Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal para insertar código */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={isInsertCodeModalVisible}
                onRequestClose={hideInsertCodeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Reading Capture</Text>
                        <Text style={styles.subText}>Insert code</Text>

                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                style={styles.modalInputB}
                                placeholder="Enter Number Client"
                                value={numberClient}
                                onChangeText={text => setNumberClient(text)}
                            />

                            <TouchableOpacity style={styles.modalButtonB}>
                                {/*Esta imagen sera temporal */}
                                <ImageBackground
                                    source={{ uri: 'https://i.postimg.cc/nhqF1brc/pngwing-com-2.png' }}
                                    style={{ width: 50, height: 50, alignSelf: 'center' }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>


                        </View>





                        <Text style={styles.subText}>Last Capture</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={lastCapture}
                            onChangeText={(text) => setLastCapture(text)}
                        />


                        <Text style={styles.subText}>New Capture</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                style={styles.modalInputB}
                                placeholder="Enter New Capture"
                                value={newCapture}
                                onChangeText={text => setNewCapture(text)}
                            />
                            <TouchableOpacity style={styles.modalButtonB} onPress={openCamera}>
                                {/*Esta imagen sera temporal */}
                                <ImageBackground
                                    source={{ uri: 'https://i.postimg.cc/KcQGYSpd/pngwing-com-3.png' }}
                                    style={{ width: 50, height: 50, alignSelf: 'center' }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>


                        <Text style={styles.subText}>Difference</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Difference"
                            value={difference}
                            onChangeText={(text) => setDifference(text)}
                        />

                        <Text style={styles.subText}>Liters</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Liters"
                            value={liters}
                            onChangeText={(text) => setLiters(text)}
                        />

                        <Text style={styles.subText}>Address</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Enter the Address"
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                        />

                        <Text style={styles.subText}>Complex</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Enter new Complex"
                            value={complex}
                            onChangeText={(text) => setComplex(text)}
                        />

                        <Text style={styles.subText}>Interior</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Enter New Interior"
                            value={interior}
                            onChangeText={(text) => setInterior(text)}
                        />

                        <Text style={styles.subText}>Debt</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Enter New Debt"
                            value={debt}
                            onChangeText={(text) => setDebt(text)}
                        />

                        <TouchableOpacity style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalButton} onPress={hideInsertCodeModal}>
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de la cámara */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={isCameraOpen}
                onRequestClose={() => setIsCameraOpen(false)}
            >
                <View style={{ flex: 1 }}>
                    <RNCamera
                        ref={cameraRef}
                        style={{ flex: 1 }}
                        type={RNCamera.Constants.Type.back}
                        autoFocus={RNCamera.Constants.AutoFocus.on}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity onPress={takePicture} style={styles.cameraButton}>
                                <Text style={styles.cameraButtonText}>Take Picture</Text>
                            </TouchableOpacity>
                        </View>
                    </RNCamera>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
    },
    Title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
    },
    buttonFilter: {
        marginTop: 15,
        borderRadius: 5,
        marginEnd: 7,
        paddingVertical: 9,
        marginStart: 2,
        width: 100,
        borderWidth: 1,
        backgroundColor: "#ebebeb",
        borderColor: "black",
    },
    selectSwitchContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    switchContainer: {
        marginLeft: 20,
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
    },
    switchText: {
        color: "black",
    },
    buttonText: {
        fontSize: 15,
        color: "black",
        textAlign: "center",
    },
    buttonTextCapture: {
        fontSize: 15,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    buttonCapture: {
        marginTop: 15,
        borderRadius: 5,
        paddingVertical: 9,
        marginLeft: 15,
        width: 100,
        backgroundColor: "#fb8c00",
    },
    filterInput: {
        width: 130,
        color: "black",
        marginTop: 6,
        borderRadius: 5,
        borderColor: "#232323",
        borderWidth: 1,
    },
    filterContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 55,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalButton: {
        marginVertical: 10,
        borderRadius: 5,
        paddingVertical: 9,
        backgroundColor: '#005aab',
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    modalTitle: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: "black",
        marginBottom: 10,
    },
    modalInput: {
        width: 250,
        color: "black",
        marginTop: 10,
        borderColor: "#232323",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    modalInputB: {
        width: 170,
        color: "black",
        marginTop: 10,
        borderColor: "#232323",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    modalButtonB: {
        borderRadius: 5,
        marginLeft: 15,
        marginTop: 12,
        width: 70,
        height: 50,
        borderColor: "black",
        borderWidth: 1,

        backgroundColor: "#ebebeb",
    },
    modalButtonTextB: {
        fontSize: 15,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",

    },
    subText: {
        color: "black",
        fontSize: 12,

    },
    cameraButton: {
        padding: 15,
        backgroundColor: '#3498db',
        borderRadius: 10,
    },
    cameraButtonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
});

export default Readings;
