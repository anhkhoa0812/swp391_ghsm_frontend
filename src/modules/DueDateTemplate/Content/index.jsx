import React from "react";
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function Content() {
  return (
    <Container>
      <Box mt={8} textAlign="left">
        <Typography variant="h3" component="h3" fontWeight="bold">
          BabyCenter's Due Date Calculator
        </Typography>
        <Typography variant="h5" mt={2}>
          Use our pregnancy calculator by plugging in the date of your last
          period, the date you conceived if you know it, the timing of your IVF
          transfer, or your first ultrasound date. The Due Date Calculator will
          do the rest!
        </Typography>

        <Typography variant="h3" component="h3" fontWeight="bold" mt={4}>
          How is my due date calculated?
        </Typography>
        <Typography variant="h5" mt={2}>
          There are several ways your due date is determined. If you happen to
          know the day you conceived, you can count 38 weeks from that day to
          find your due date. (Human gestation takes about 38 weeks.) But very
          few expectant moms know exactly when they conceived. Even if you only
          had sex once during your fertile period, you wouldn't conceive on that
          day unless you happen to be ovulating. Sperm can live for up to five
          days inside your fallopian tubes. Meaning it could be up to five days
          after you have sex that you release an egg (ovulate) and it gets
          fertilized by a waiting sperm. That's the day you conceive. So without
          knowing the day of conception, how does anyone determine a due date?
        </Typography>

        <Typography variant="h3" component="h3" fontWeight="bold" mt={4}>
          First day of your last period
        </Typography>
        <Typography variant="h5" mt={2}>
          The most common way to calculate your pregnancy due date is by
          counting 40 weeks from the first day of your last menstrual period
          (LMP) (or choosing that option from our tool’s menu above). And that's
          how most healthcare providers do it. If your menstrual cycle length is
          the average length (28-day cycle), your period probably started about
          two weeks before you conceived. This explains why pregnancies are said
          to last 40 weeks instead of 38 weeks. This method doesn't take into
          account how long your cycle actually is or when you think you might
          have conceived. But generally speaking, women typically ovulate about
          two weeks after their menstrual cycle starts. And women are more
          likely to know when their last period started than the day they
          ovulated. If you know the first day of your last menstrual period, you
          can use our Due Date Calculator to predict your estimated due date.
        </Typography>

        <Typography variant="h3" component="h3" fontWeight="bold" mt={4}>
          Conception date
        </Typography>
        <Typography variant="h5" mt={2}>
          If you do happen to know precisely when you conceived – say, if you
          were using an ovulation predictor kit or tracking your ovulation
          symptoms – you can calculate your pregnancy due date based on your
          conception date. Just choose that calculation method from the pulldown
          above and put in your date. Remember, you don't necessarily conceive
          on the day you have sex.
        </Typography>

        <Typography variant="h3" component="h3" fontWeight="bold" mt={4}>
          IVF transfer date
        </Typography>
        <Typography variant="h5" mt={2}>
          If you conceived through IVF, you can calculate your due date using
          your IVF transfer date. If you had a Day 5 embryo transfer, count 261
          days from your transfer date. If you had a Day 3 embryo transfer,
          count 263 days. Or select "IVF" from our Due Date Calculator method
          choices.
        </Typography>

        <Typography variant="h3" component="h3" fontWeight="bold" mt={4}>
          Ultrasound scan
        </Typography>
        <Typography variant="h5" mt={2}>
          If you want to try a different method for calculating your due date
          and are among those who have at least one early, first trimester
          ultrasound, that scan in your doctor’s or midwife’s office can help
          you and your practitioner pinpoint when your baby is expected to
          arrive. The timing of an early ultrasound can sometimes more
          accurately date the pregnancy than your last menstrual period,
          conception date, and other methods. Just choose "ultrasound" from our
          Due Date Calculator dropdown menu. Remember, however, that not all
          pregnant women will have an ultrasound at their first prenatal
          appointment or another early check-up. Some practitioners perform them
          for all expectant patients, while others only do them if your due date
          can’t be calculated by the usual methods or determined via a physical
          exam. They might also do early ultrasounds if you have risk factors
          including previous pregnancy complications, a history of miscarriages
          or other pregnancy losses, irregular periods or trouble conceiving,
          various chronic health conditions, or are 35 or older.
        </Typography>

        <Typography variant="h3" component="h3" fontWeight="bold" mt={4}>
          Can my due date change?
        </Typography>
        <Typography variant="h5" mt={2}>
          Your healthcare provider might revise your due date if your baby is
          measured during a first trimester ultrasound scan and found to be much
          bigger or smaller than expected for gestational age. This is more
          likely to happen if you have an irregular menstrual cycle length that
          makes it hard to pinpoint the date of conception. Your healthcare
          provider will measure your baby during that ultrasound exam to figure
          out how far along your baby is and then provide you with a new due
          date.
        </Typography>

        <Typography variant="h3" component="h3" fontWeight="bold" mt={4}>
          What if I already know my due date?
        </Typography>
        <Typography variant="h5" mt={2}>
          If you already know your due date, you can use this pregnancy
          calculator to see your pregnancy timeline. It will tell you when
          you'll hit various milestones, and when you may be due for prenatal
          tests and prenatal visits. You'll also find out what your baby's sign
          and birthstone will probably be and a few famous people who were born
          on your due date.
        </Typography>

        <Typography variant="h3" component="h3" fontWeight="bold" mt={4}>
          How likely am I to give birth on my due date?
        </Typography>
        <Typography variant="h5" mt={2}>
          Of course, a due date calculation is always approximate, whether it's
          from our pregnancy calculator or from your doctor or midwife. Only 1
          in 20 women delivers on her due date. You're just as likely to go into
          labor any day during the two weeks before or after. Want more
          information about how the weeks, months, and trimesters of pregnancy
          are counted? See our pregnancy timing chart.
        </Typography>

        <Typography variant="h3" component="h3" fontWeight="bold" mt={4}>
          How soon can I take a pregnancy test?
        </Typography>
        <Typography variant="h5" mt={2}>
          With all this talk about pregnancy due dates, you may be wondering
          when you can take a pregnancy test. To ensure you get the most
          accurate reading, it's best to wait a few days after your missed
          period to take a pregnancy test. At-home urine tests measure the
          amount of hCG (human chorionic gonadotropin) present in your body. If
          you take a pregnancy test before you miss your period, you may not get
          an accurate result, despite what some tests advertise. If you're
          getting a blood test in your provider's office, you may get results
          sooner. These tests also measure the amount of hCG in your
          bloodstream, but they're more sensitive than at-home urine tests.
          Blood tests may be able to detect pregnancy six to eight days after
          ovulation.
        </Typography>

        <Typography variant="h3" component="h3" fontWeight="bold" mt={4}>
          How accurate are due dates, according to moms?
        </Typography>
        <Typography variant="h5" mt={2}>
          While your due date helps you and your provider estimate your baby’s
          arrival and track their development during pregnancy, the vast
          majority of babies aren’t born on their exact due date. Here’s what
          moms experienced:
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 4, mt: 2 }}>
          <ListItem sx={{ display: "list-item", py: 0 }}>
            <ListItemText primary="“My first two were both two weeks late (I had to be induced) and my third was exactly a week early.” – Bremgoe91" />
          </ListItem>
          <ListItem sx={{ display: "list-item", py: 0 }}>
            <ListItemText primary="“I have four kids, and they came on their due date or a day before or after.” – 8Daisy" />
          </ListItem>
          <ListItem sx={{ display: "list-item", py: 0 }}>
            <ListItemText primary="“Both my sons went to 41 weeks and two days. I thought I was going to be pregnant forever.” – GothHoney87" />
          </ListItem>
          <ListItem sx={{ display: "list-item", py: 0 }}>
            <ListItemText primary="“With my first, everyone told me I was going to go past my due date, but I went into labor at 38 weeks and five days.” – Hannahkovachick" />
          </ListItem>
          <ListItem sx={{ display: "list-item", py: 0 }}>
            <ListItemText primary="“My first came on his due date; my second came a week late.” – Ninalynn05" />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
