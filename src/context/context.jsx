import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();
const ContextProvider = (props) => {

    ////getting the input from user and display it in tyhe component:

    ////to insert data
    const [input, setInput] = useState("");

    ////when button clicked, input will be saved in recentprompts
    const [recentPrompt, setRecentPrompt] = useState("");

    /////prevPrompts will be stored in the recent tab of the sidebar 
    const [prevPrompt, setPrevPrompt] = useState([]);

    ////when boolean is true, result will be displayed and the derfault mainPage will hide
    const [showResult, setShowResult] = useState(false);

    ////if true, it will display loading animation
    const [loading, setLoading] = useState(false);

    ////get this state to display result of search in the web-page
    const [resultData, setResultData] = useState("");


    ////this function will display the text one by one
    const delayPara = (index, nextWord) => {

        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }


    ////function to create new chat
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }


    const onSent = async (prompt) => {

        ///first when we reset the result data will be empty
        setResultData("");
        ///set to true to display loading animation
        setLoading(true);
        ///to get the result and display in chat
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            ///this if will work when we click on recent item in sidebar
            response = await run(prompt);
            setRecentPrompt(prompt)
        }
        else {
            ////this will excute when onSend is excuted for our input field
            setPrevPrompt(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }


        // setRecentPrompt(input);
        // ///our input will be stored in prevPrompts
        // setPrevPrompt(prev => [...prev, input])
        // ///the responose is now stored in this response variable
        // const response = await run(input);



        /////the parts of the string between ** will be stored in an array
        let responseArray = response.split("**")
        //// it is ="" so the word 'undefined' will not be displayed
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            ///if it is = 0 or even number
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                ///text will be added in bold tag
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        ///whever we get sibgle star(*), it will be replaced with <br/>(break line)
        let newResponse2 = newResponse.split("*").join("<br/>")

        // setResultData(newResponse2);
        let newResponseArray = newResponse2.split(" ")
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        ///to hide the loading animation
        setLoading(false);
        ////resetting input field
        setInput("");
    }


    const contextValue = {
        ///passing the state varibales to the context so that they can access in other components(sidebar,main)
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat


    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider