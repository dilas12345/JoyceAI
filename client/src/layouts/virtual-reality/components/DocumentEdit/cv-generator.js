import {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TabStopPosition,
    TabStopType,
    TextRun
  } from "docx";
  const PHONE_NUMBER = "07534563401";
  const PROFILE_URL = "https://www.linkedin.com/in/dolan1";
  const EMAIL = "docx@docx.com";
  
export default DocumentCreator=()=> {
    // tslint:disable-next-line: typedef
    function create([experiences, educations, skills, achivements]) {
        const document = new Document({
          sections: [
            {
              children: [
                new Paragraph({
                  text: "Dolan Miu",
                  heading: HeadingLevel.TITLE
                }),
                createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
                createHeading("Education"),
                ...educations
                  .map(education => {
                    const arr = [];
                    arr.push(
                      createInstitutionHeader(
                        education.schoolName,
                        `${education.startDate.year} - ${education.endDate.year}`
                      )
                    );
                    arr.push(
                      createRoleText(
                        `${education.fieldOfStudy} - ${education.degree}`
                      )
                    );
      
                    const bulletPoints = splitParagraphIntoBullets(
                      education.notes
                    );
                    bulletPoints.forEach(bulletPoint => {
                      arr.push(createBullet(bulletPoint));
                    });
      
                    return arr;
                  })
                  .reduce((prev, curr) => prev.concat(curr), []),
                createHeading("Experience"),
                ...experiences
                  .map(position => {
                    const arr = [];
      
                    arr.push(
                      createInstitutionHeader(
                        position.company.name,
                        createPositionDateText(
                          position.startDate,
                          position.endDate,
                          position.isCurrent
                        )
                      )
                    );
                    arr.push(createRoleText(position.title));
      
                    const bulletPoints = splitParagraphIntoBullets(
                      position.summary
                    );
      
                    bulletPoints.forEach(bulletPoint => {
                      arr.push(createBullet(bulletPoint));
                    });
      
                    return arr;
                  })
                  .reduce((prev, curr) => prev.concat(curr), []),
                createHeading("Skills, Achievements and Interests"),
                createSubHeading("Skills"),
                createSkillList(skills),
                createSubHeading("Achievements"),
                ...createAchivementsList(achivements),
                createSubHeading("Interests"),
                createInterests(
                  "Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing."
                ),
                createHeading("References"),
                new Paragraph(
                  "Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk"
                ),
                new Paragraph("More references upon request"),
                new Paragraph({
                  text:
                    "This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.",
                  alignment: AlignmentType.CENTER
                })
              ]
            }
          ]
        });
      
        return document;
    }
    function createContactInfo(phoneNumber, profileUrl, email) {
        return new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
            new TextRun(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`),
            new TextRun({
                text: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
                break: 1
            })
            ]
        });
        }

        function createHeading(text) {
        return new Paragraph({
            text: text,
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true
        });
        }

        function createSubHeading(text) {
        return new Paragraph({
            text: text,
            heading: HeadingLevel.HEADING_2
        });
        }

        function createInstitutionHeader(institutionName, dateText) {
        return new Paragraph({
            tabStops: [
            {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX
            }
            ],
            children: [
            new TextRun({
                text: institutionName,
                bold: true
            }),
            new TextRun({
                text: `\t${dateText}`,
                bold: true
            })
            ]
        });
        }

        function createRoleText(roleText) {
        return new Paragraph({
            children: [
            new TextRun({
                text: roleText,
                italics: true
            })
            ]
        });
        }

        function createBullet(text) {
        return new Paragraph({
            text: text,
            bullet: {
            level: 0
            }
        });
        }

        function createSkillList(skills) {
        return new Paragraph({
            children: [new TextRun(skills.map(skill => skill.name).join(", ") + ".")]
        });
        }

        function createAchivementsList(achivements) {
        return achivements.map(
            achievement => new Paragraph({
            text: achievement.name,
            bullet: {
                level: 0
            }
            })
        );
        }

        function createInterests(interests) {
        return new Paragraph({
            children: [new TextRun(interests)]
        });
        }

        function splitParagraphIntoBullets(text) {
        return text.split("\n\n");
        }

        function createPositionDateText(startDate, endDate, isCurrent) {
        const startDateText = getMonthFromInt(startDate.month) + ". " + startDate.year;
        const endDateText = isCurrent
            ? "Present"
            : `${getMonthFromInt(endDate.month)}. ${endDate.year}`;

        return `${startDateText} - ${endDateText}`;
        }

        function getMonthFromInt(monthInt) {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return months[monthInt - 1];
        }

    
  }