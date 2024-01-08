import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { Button, Container, Stack, Typography, Box} from "@mui/material"; 
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";




const AddWords = () => {

    const [selectedWords, setSelectedWords] = useState<any[]>([]);
    const { words } = useSelector((state: RootState) => state.words); // Ovo je nadam se tocno

    var columns: GridColDef[] = [
        {field: "id", headerName: "ID", flex: 1},
        {field: "word", headerName: "Word", flex: 1},
        {field: "translation", headerName: "Translation", flex: 1}
    ]
    
    var rows = words.map(el =>({
        id: el.wordid,
        word: el.foreignname,
        translation: el.croatianname
    }))

    var temp_rows = [
        {id: 34, word: "table", translation: "stol"},
        {id: 35, word: "edge", translation: "ivica"},
        {id: 36, word: "pot", translation: "marica"}
    ]   // Ovo cemo kasnije skloniti

    temp_rows.forEach(el => {rows.push(el)})

    const handleRowSelection = (newSelection: GridRowSelectionModel) => {
        const selectedRows = newSelection as GridRowId[];
        const selectedData = selectedRows.map((rowId) => {
        const selectedRow = rows.find((row) => row.id === rowId);
        return selectedRow ? { id: selectedRow.id, word: selectedRow.word, translation: selectedRow.translation } : null;
        });
        const filteredSelectedData = selectedData.filter((row) => row !== null);
        console.log(selectedWords)      
        // Trenutno ima glitch gdje ne azurira odma kako treba, al cijeli dan
        // ovo grindam, za sada je dobro
        setSelectedWords(filteredSelectedData);
    };

    return (
    
        <Container maxWidth="md">
            <Box margin={"auto"} bgcolor={"rgb(188, 232, 218)"} maxHeight="md" padding={"5em"} marginTop="3em">
                <Typography component="h1" variant="h5">We gon be ading words with this one boys! </Typography>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx = {{
                        marginTop: "1em",
                        borderColor: "black"
                    }}
                    onRowSelectionModelChange={(newSelectionModel) => {
                        handleRowSelection(newSelectionModel);
                      }}
                />

                <Box
                    display={"flex"}
                    flexDirection="row"
                    justifyContent={"space-between"}
                    width="100%"
                    marginTop={"2em"}
                >
                    <Button variant="contained" sx={{ width: "48%", justifyContent: "flex-end"}}>Cancel</Button>
                    <Button variant="contained" sx={{ width: "48%", justifyContent: "flex-end" }}>Add them words</Button>
                </Box>
            </Box>
        </Container>
    );
}

export default AddWords; // export default znaci da je ovo entrypoint