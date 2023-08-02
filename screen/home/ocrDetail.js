import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableWithoutFeedback, Keyboard, useWindowDimensions } from 'react-native';

const OcrDetail = ({ route }) => {
    const [text, setText] = useState('');
    const [wordToHighlight, setWordToHighlight] = useState('');
    const [highlightedText, setHighlightedText] = useState('');

    // Fetch and set the 'text' state once when the component mounts
    useEffect(() => {
        const initialText = route.params.resultText.toString();
        setText(initialText);
        setHighlightedText(initialText);
    }, [route.params.resultText]);

    const handleWordToHighlightChange = (value) => {
        setWordToHighlight(value);
        const regex = new RegExp(`\\b(${value.toLowerCase()})\\b`, 'g');
        const newHighlightedText = text.replace(regex, `<mark><strong style="font-size: 20px;">$&</strong></mark>`);
        setHighlightedText(newHighlightedText);
    };

    const windowWidth = useWindowDimensions().width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1, backgroundColor: "red", alignItems: "center", justifyContent: "center" }} >
                <Text style={{ fontSize: 50, textAlign: "center" }}>{highlightedText}</Text>
                <TextInput
                    style={{ marginTop: 12, color: "red", fontSize: 59, textAlign: "center" }}
                    value={wordToHighlight}
                    onChangeText={handleWordToHighlightChange}
                    autoCapitalize="none"
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default OcrDetail;
