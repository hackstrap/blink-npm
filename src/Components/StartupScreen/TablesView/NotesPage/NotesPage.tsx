import React, { ReactNode } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  colors,
  Theme,
  Container,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import NotesComponent from "./NotesComponent/NotesComponent";
import { fetchCollection, updateCollection } from "../../../fetch";
import { StringLiteralLike, updateDefaultClause } from "typescript";
import { NoteDataInterface, OptionInterface } from "../../../interfaces";

const defaultText = `May 2021 Investor Updates
In this section, startups can share updates regaring the growth, sales, new partnerships, hires, and the other things going on at the company.

Product Updates
Write about product update 1.
Write about Product update 2.

Growth Updates
Write about growth update 1.
Write about growth update 2.

Sales and new partnerships Updates
Write about sales updates.
Write about partnership updates.

New Hire Updates
Write about full-time hires updates.
Write about ESPOs Update.

Other Updates/Conclusion
Over all the summary for the month in brief and any points to share can be done as a conclusion in this paragraph. `;

export const extractNote = (
  data: NoteDataInterface[],
  currentMonth: string
) => {
  const note = data.filter((data) => {
    if (monthsArray[data.month - 1] === currentMonth) return true;
    else return false;
  });
  return note;
};

const useStyles = makeStyles({
  page: {
    marginTop: "2rem",
    width: "100%",
  },
});

const monthsArray = [
  "janurary",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

interface PropsInterface {
  selectedStartup: OptionInterface;
}

const NotesPage = (props: PropsInterface) => {
  const theme = useTheme();
  const classes = useStyles();
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear().toString()
  );
  const [currentMonth, setCurrentMonth] = React.useState(
    monthsArray[new Date().getMonth()]
  );

  const [noteData, setnoteData] =
    React.useState<NoteDataInterface | null>(null);

  const getData = () => {
    fetchCollection("notes", currentYear, props.selectedStartup.accessor).then(
      (res) => {
        const note = extractNote(res.data, currentMonth);
        if (note.length) {
          setnoteData(note[0]);
        } else {
          console.log("note not avaliable, init empty note");
          setnoteData({
            note_name: "Investor Update",
            month: new Date().getMonth() + 1,
            note_data: "<p>Hello</p>",
            email_status: false,
            investor_view: false,
            last_emailed: "",
            last_updated: "",
            year: 2021,
            startup_id: "startup-1slug",
          });
        }
      }
    );
  };

  React.useEffect(() => {
    getData();
  }, [currentYear, currentMonth]);

  const notesConfig = [
    {
      Header: "Investor Update",
      accessor: "Hello",
    },
  ];

  // const renderNotes = (config: { Header: string; accessor: string }[]) => {
  //   return config.map((chart, i) => {
  //     return (
  //       <Grid item xs={12} key={i}>
  //         <NotesComponent
  //           title={chart.Header}
  //           defaultValue={defaultText}
  //           currentYear={currentYear}
  //           setCurrentYear={(year: string) => setCurrentYear(year)}
  //           currentMonth={currentMonth}
  //           setCurrentMonth={(month: string) => setCurrentMonth(month)}
  //         />
  //         {/* <Note2 /> */}
  //       </Grid>
  //     );
  //   });
  // };
  const updateData = (noteData: NoteDataInterface) => {
    let num;
    monthsArray.find((m, i, j) => {
      if (m === currentMonth) num = i + 1;
    });
    let data = {
      ...noteData,
      month: num,
    };
    updateCollection("notes", [data], props.selectedStartup.accessor)
      .then((res) => {
        getData();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.page}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {noteData ? (
            <NotesComponent
              currentYear={currentYear}
              setCurrentYear={(year: string) => setCurrentYear(year)}
              currentMonth={currentMonth}
              setCurrentMonth={(month: string) => setCurrentMonth(month)}
              setNoteData={(val: NoteDataInterface) => setnoteData(val)}
              noteData={noteData}
              saveChangeHandler={(val: NoteDataInterface) => updateData(val)}
            />
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default NotesPage;
