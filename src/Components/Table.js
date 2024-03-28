import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios"
import Button from '@mui/material/Button';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
let books = [
  {
      userId: "T1FW7",
      isbn: "9781491950296",
      title: "Programming JavaScript Applications",
      subTitle: "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
      author: "Eric Elliott",
      publishDate: "2014-07-01",
      publisher: "O'Reilly Media",
      pages: 254,
      description: "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in  this practical book, experienced JavaScript developers will learn how to write flex",
      website: "http://chimera.labs.oreilly.com/books/1234000000262/index.html"
  },
  {
      userId: "T1FW7",
      isbn: "9781593277574",
      title: "Understanding ECMAScript 6",
      subTitle: "The Definitive Guide for JavaScript Developers",
      author: "Nicholas C. Zakas",
      publishDate: "2016-09-03",
      publisher: "No Starch Press",
      pages: 352,
      description: "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E",
      website: "https://leanpub.com/understandinges6/read"
  }
]







export default function BasicTable() {

  const [bookList,setBookList] = React.useState(books)
  const [selectedArray,setSelectedArray] = React.useState([])
  const [isbn,setIsbn] = React.useState([])

  React.useEffect(() =>
  async () => {
      try {
          const bookOutput = await axios.get('http://localhost:8080/BookStore/Books')
          // console.log(bookOutput)
          let arr = bookOutput.data
          
         
          
          setBookList(arr.map((ele)=> ({...ele,isSelected:false})))
      }
      catch (error) {
          console.log(error)
      }

  }


  , [])

  const handleChecked = (e,selectedId) =>{
    console.log(e.target.checked,selectedId)
    
    // console.log(bookList)
    setBookList(bookList.map((ele)=> (selectedId === ele.isbn ? {...ele,isSelected:e.target.checked} : {...ele})))
    
  }

  const onDelete = ()=>{
    // console.log('clicked')
    let arr = [...bookList]
   let final =  arr.filter(item=> item.isSelected === true)
   console.log(final)
  final.forEach((item)=>(setIsbn(prev=>[...prev,item.isbn])))
  
  }
  console.log(isbn)
// console.log('final',bookList)
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
            <TableCell align="right">ISBN</TableCell>
            <TableCell align="right">Title</TableCell>
            
            <TableCell align="right">Author</TableCell>
           
            
           
          </TableRow>
        </TableHead>
        <TableBody>
       
          {bookList.map((row) => (
            <TableRow
              key={row.isbn}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
              <Checkbox onChange={(e)=>handleChecked(e,row.isbn)}/>
              </TableCell>
             
              <TableCell align="right">{row.isbn}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.author}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button
    onClick={()=>onDelete()}
    variant="contained"
    sx={{
        textTransform: 'none',
        color: 'primary.light',
        backgroundColor: 'primary.dark',
        m: '1rem',
        width:'2rem'
    }}
>Delete</Button>
    </>
    
  );
}