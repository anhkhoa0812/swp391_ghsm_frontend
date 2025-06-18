"use client";

import React, { useState } from "react";
import {
  Select,
  Button,
  Form,
  Card,
  Typography,
  Breadcrumb,
  Table,
} from "antd";
import {
  format,
  addDays,
  subDays,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
  HeartOutlined,
  WarningOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { DatePicker, Row, Col, Collapse, Popover } from "antd";
import "./index.css";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

export default function Ovulation() {
  const [pillType, setPillType] = useState(null);
  const [lastPeriodDate, setLastPeriodDate] = useState(undefined);
  const [cycleLength, setCycleLength] = useState("28");
  const [showResults, setShowResults] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(undefined);
  const [results, setResults] = useState(null);
  const [multiCycleResults, setMultiCycleResults] = useState([]);
  const [currentCycleIndex, setCurrentCycleIndex] = useState(0);
  const [activeKey, setActiveKey] = useState([]);

  const handleCalculate = () => {
    if (lastPeriodDate) {
      const cycleLengthNum = Number.parseInt(cycleLength);
      const cycles = [];

      for (let i = 0; i < 6; i++) {
        const menstruationDate = addDays(lastPeriodDate, i * cycleLengthNum);
        const ovulationDate = addDays(menstruationDate, cycleLengthNum - 14);
        const fertileStart = subDays(ovulationDate, 5);
        const fertileEnd = addDays(ovulationDate, 1);
        const dueDate = addDays(menstruationDate, 280);

        cycles.push({
          key: i + 1,
          cycle: `Cycle ${i + 1}`,
          menstruationDate,
          ovulationDate,
          fertileStart,
          fertileEnd,
          dueDate,
        });
      }

      setMultiCycleResults(cycles);
      setResults(cycles[0]);
      setCurrentCycleIndex(0);
      setCurrentMonth(cycles[0].fertileStart);
      setShowResults(true);
    }
  };

  const nextMonth = () => {
    if (currentMonth) {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const prevMonth = () => {
    if (currentMonth) {
      setCurrentMonth(addMonths(currentMonth, -1));
    }
  };

  const resetCalculator = () => {
    setShowResults(false);
    setResults(null);
    setMultiCycleResults([]);
    setCurrentCycleIndex(0);
  };

  const togglePanel = (key) => {
    if (Array.isArray(activeKey) && activeKey.includes(key)) {
      setActiveKey(activeKey.filter((k) => k !== key));
    } else {
      setActiveKey([...(Array.isArray(activeKey) ? activeKey : []), key]);
    }
  };

  const goToNextCycle = () => {
    if (currentCycleIndex + 1 < multiCycleResults.length) {
      const nextIndex = currentCycleIndex + 1;
      setCurrentCycleIndex(nextIndex);
      setResults(multiCycleResults[nextIndex]);
      setCurrentMonth(multiCycleResults[nextIndex].fertileStart);
    }
  };

  const goToPreviousCycle = () => {
    if (currentCycleIndex > 0) {
      const prevIndex = currentCycleIndex - 1;
      setCurrentCycleIndex(prevIndex);
      setResults(multiCycleResults[prevIndex]);
      setCurrentMonth(multiCycleResults[prevIndex].fertileStart);
    }
  };

  const generatePillReminderTable = () => {
    if (!pillType || !results) return [];
    const start = results.menstruationDate;
    let totalDays = 0;
    if (pillType === "21") totalDays = 21;
    else if (pillType === "28") totalDays = 28;
    else if (pillType === "continuous") totalDays = 30;

    return Array.from({ length: totalDays }, (_, i) => {
      const date = addDays(start, i);
      return {
        key: i,
        day: i + 1,
        date: format(date, "MMM d, yyyy"),
        note: "Take Pill",
      };
    });
  };

  const renderCalendar = () => {
    if (!results || !currentMonth) return null;

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const isFertileDay = (date) =>
      date >= results.fertileStart && date <= results.fertileEnd;
    const isOvulationDay = (date) => isSameDay(date, results.ovulationDate);
    const isMenstruationDay = (date) =>
      multiCycleResults.some((cycle) =>
        isSameDay(date, cycle.menstruationDate)
      );
    const isDueDate = (date) => isSameDay(date, results.dueDate);

    return (
      <>
        <Card className="mt-4">
          <div className="d-flex align-items-center justify-content-between p-2 bg-light">
            <Button icon={<LeftOutlined />} onClick={prevMonth} size="small" />
            <Title level={5} className="m-0">
              {format(currentMonth, "MMMM yyyy")}
            </Title>
            <Button icon={<RightOutlined />} onClick={nextMonth} size="small" />
          </div>

          <div className="container-fluid p-0">
            <Row className="text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <Col span={3} key={i} className="py-2">
                  <Text type="secondary" strong>
                    {day}
                  </Text>
                </Col>
              ))}
            </Row>

            <Row className="text-center">
              {Array.from({ length: new Date(monthStart).getDay() }).map(
                (_, i) => (
                  <Col span={3} key={`empty-${i}`} className="p-2" />
                )
              )}

              {days.map((day, i) => {
                let icon = null;
                let title = null;

                if (isMenstruationDay(day)) {
                  icon = <HeartOutlined style={{ color: "#e74c3c" }} />;
                  title = "Menstruation Day";
                } else if (isDueDate(day)) {
                  icon = <WarningOutlined style={{ color: "#f39c12" }} />;
                  title = "Expected Due Date";
                } else if (isOvulationDay(day)) {
                  icon = <CalendarOutlined style={{ color: "#17a2b8" }} />;
                  title = "Ovulation Day";
                }

                const bgClass = isFertileDay(day)
                  ? "bg-info bg-opacity-25"
                  : "";

                return (
                  <Col
                    span={3}
                    key={i}
                    className="p-2 text-center position-relative"
                  >
                    <div
                      className={`d-flex h-8 w-8 rounded-circle ${bgClass} mx-auto align-items-center justify-content-center`}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    >
                      {title ? (
                        <Popover content={title}>{icon}</Popover>
                      ) : (
                        format(day, "d")
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>

          <div className="text-start p-3">
            <Title level={5}>Legend</Title>
            <div className="d-flex flex-wrap gap-3">
              <div className="d-flex align-items-center gap-2">
                <HeartOutlined style={{ color: "#e74c3c" }} />
                <Text>Menstruation Day</Text>
              </div>
              <div className="d-flex align-items-center gap-2">
                <WarningOutlined style={{ color: "#f39c12" }} />
                <Text>Expected Due Date</Text>
              </div>
              <div className="d-flex align-items-center gap-2">
                <CalendarOutlined style={{ color: "#17a2b8" }} />
                <Text>Ovulation Day</Text>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: "#b8e1f5",
                    borderRadius: 4,
                  }}
                ></div>
                <Text>Fertile Window</Text>
              </div>
            </div>
          </div>

          <div className="text-center p-3">
            <Button type="default" onClick={resetCalculator} className="me-2">
              Start over
            </Button>
            <Button
              onClick={goToPreviousCycle}
              disabled={currentCycleIndex === 0}
              className="me-2"
            >
              Previous Cycle
            </Button>
            <Button
              type="primary"
              onClick={goToNextCycle}
              disabled={currentCycleIndex + 1 >= multiCycleResults.length}
            >
              Next Cycle <RightOutlined />
            </Button>
          </div>
        </Card>

        <Card className="mt-4">
          <Title level={4}>Pill Reminder Schedule</Title>
          <Table
            bordered
            size="small"
            pagination={false}
            dataSource={generatePillReminderTable()}
            columns={[
              {
                title: "Day",
                dataIndex: "day",
                key: "day",
                align: "center",
              },
              {
                title: "Date",
                dataIndex: "date",
                key: "date",
                align: "center",
              },
              {
                title: "Note",
                dataIndex: "note",
                key: "note",
                align: "center",
              },
            ]}
          />
        </Card>
      </>
    );
  };

  return (
    <div
      className="container py-4"
      style={{
        maxWidth: "800px",
      }}
    >
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <a href="#" className="text-success">
            Track Your Fertility
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="#" className="text-success">
            Ovulation
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={1}>Cycle & Ovulation Guide</Title>

      <Paragraph className="mb-4">
        Track your fertility cycle with our tool to determine your ovulation
        days and maximize your chances of conception. By predicting your most
        fertile window and ovulation date, this tool supports your journey to
        starting a family!
      </Paragraph>

      {!showResults ? (
        <Card
          className="bg-light bg-opacity-25 shadow-lg"
          style={{ maxWidth: "800px", margin: "auto" }}
        >
          <Form layout="vertical" onFinish={handleCalculate}>
            <Form.Item
              label="First day of your last period"
              className="mb-4"
              name="lastPeriodDate"
              rules={[
                {
                  required: true,
                  message: "Please select the first day of your last period!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%", minHeight: "40px" }}
                onChange={(date) => setLastPeriodDate(date?.toDate())}
                format="DD-MM-YYYY"
                placeholder="Select a date"
                dropdownAlign={{ offset: [0, 4] }}
              />
            </Form.Item>

            <Form.Item
              label="How long was your last cycle"
              className="mb-4"
              name="cycleLength"
              rules={[
                {
                  required: true,
                  message: "Please select your cycle length!",
                },
                {
                  validator: (_, value) =>
                    value !== "none"
                      ? Promise.resolve()
                      : Promise.reject("Please select your cycle length!"),
                },
              ]}
            >
              <Select
                value={cycleLength}
                onChange={setCycleLength}
                style={{ width: "100%", minHeight: "40px" }}
                placeholder="Select cycle length"
              >
                <Option value="none" disabled>
                  None
                </Option>
                {Array.from({ length: 15 }, (_, i) => i + 21).map((days) => (
                  <Option key={days} value={days.toString()}>
                    {days} days
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Type of birth control pill (optional)"
              className="mb-4"
              name="pillType"
            >
              <Select
                allowClear
                value={pillType}
                onChange={(val) => setPillType(val)}
                placeholder="Select pill type (optional)"
                style={{ width: "100%", minHeight: "40px" }}
              >
                <Option value="21">21-day pill (7-day break)</Option>
                <Option value="28">28-day pill (7 placebo)</Option>
                <Option value="continuous">Continuous use (no break)</Option>
              </Select>
            </Form.Item>

            <Button
              type="primary"
              style={{
                backgroundColor: "#615efc",
                width: "30%",
                padding: "10px 0",
                transition: "all 0.3s ease",
              }}
              htmlType="submit"
              size="large"
              className="focus-button"
            >
              Submit
            </Button>
          </Form>
        </Card>
      ) : (
        <div>
          {renderCalendar()}

          <div className="mt-4 pt-4 border-top">
            <Paragraph>
              Most couples get pregnant within three months. If you try for a
              year without success (or six months if you're 35 or older), seek
              help from a{" "}
              <a href="#" className="fw-medium text-decoration-underline">
                fertility specialist
              </a>
              .
            </Paragraph>
          </div>
        </div>
      )}
      <div className="mt-5 container">
        <div className="row">
          <div className="col-12 my-5">
            <section>
              <Title level={2} className="mb-4">
                How to Increase Your Chances of Pregnancy
              </Title>
              <ul className="list-unstyled">
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">
                    Use an ovulation tracker or test kit, or monitor your body’s
                    signals to determine your most fertile days.
                  </Paragraph>
                </li>
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">
                    Engage in intercourse every other day during your fertile
                    window for the best chances of conception.
                  </Paragraph>
                </li>
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">
                    Begin taking a prenatal vitamin with folic acid at least a
                    month before trying to conceive (preferably 6 months ahead).
                  </Paragraph>
                </li>
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">
                    Consult with your healthcare provider to ensure pre-existing
                    medical conditions are under control. Regular check-ups and
                    vaccinations can significantly reduce pregnancy
                    complications.
                  </Paragraph>
                </li>
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">
                    Focus on maintaining a healthy lifestyle. Eliminate harmful
                    habits such as smoking, start a fitness routine if you don’t
                    already have one, and nourish your body with a balanced,
                    nutritious diet.
                  </Paragraph>
                </li>
              </ul>
            </section>
          </div>

          <div className="col-12 my-5">
            <section>
              <Title level={2} className="mb-4">
                How moms calculate ovulation
              </Title>
              <Paragraph className="mb-3">
                In addition to using an ovulation calculator, here are ways that
                moms in the BabyCenter Community know they're ovulating:
              </Paragraph>
              <div className="d-flex flex-column gap-3">
                <blockquote
                  className="blockquote border-start border-info ps-3"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="fst-italic mb-0">
                    "I usually get ovulation cramping or pain on my left side" –
                    mommy1johnson
                  </p>
                </blockquote>
                <blockquote
                  className="blockquote border-start border-info ps-3"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="fst-italic mb-0">
                    "My ovulation signs are cervical mucus that looks like egg
                    whites; occasional, very mild, one-sided ovarian discomfort;
                    a higher sex drive; and increased appetite." – krt1987
                  </p>
                </blockquote>
                <blockquote
                  className="blockquote border-start border-info ps-3"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="fst-italic mb-0">
                    "I get bloated and my lower abdomen feels very sore." –
                    Kmarvin91
                  </p>
                </blockquote>
                <blockquote
                  className="blockquote border-start border-info ps-3"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="fst-italic mb-0">
                    "My BBT typically rises incrementally over three days, for a
                    total rise of .8 or .9 over pre-ovulation temperatures." –
                    Rikkubug
                  </p>
                </blockquote>
                <blockquote
                  className="blockquote border-start border-info ps-3"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="fst-italic mb-0">
                    "I woke up in the middle of the night and had an increase in
                    body temperature and lower back pain on the left side." –
                    Newwifelife
                  </p>
                </blockquote>
                <blockquote
                  className="blockquote border-start border-info ps-3"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="fst-italic mb-0">
                    "I have slight bloating, increased appetite, and light
                    cramps like the ones I get before my period. Plus, I'm in a
                    great mood!" – NadiaFlower
                  </p>
                </blockquote>
              </div>
            </section>
          </div>

          <div className="col-12 my-5">
            <section>
              <Title level={2} className="mb-4">
                Signs of ovulation
              </Title>
              <ul className="list-unstyled">
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">
                    Rise in basal body temperature
                  </Paragraph>
                </li>
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">
                    Cervical mucus is the texture of egg whites
                  </Paragraph>
                </li>
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">Breast tenderness</Paragraph>
                </li>
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">
                    Mild cramps or twinges in the abdomen
                  </Paragraph>
                </li>
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">Very mild spotting</Paragraph>
                </li>
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">
                    Heightened sense of smell
                  </Paragraph>
                </li>
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">Increased sex drive</Paragraph>
                </li>
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">
                    Changes in appetite or mood
                  </Paragraph>
                </li>
                <li className="d-flex gap-2 mb-3">
                  <div
                    className="rounded-circle bg-info"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "10px",
                    }}
                  />
                  <Paragraph className="m-0">Bloating</Paragraph>
                </li>
              </ul>
            </section>
          </div>

          <div className="col-12 my-5">
            <section>
              <Title level={2} className="mb-4">
                Frequently asked questions
              </Title>
              <div className="d-flex flex-column gap-3">
                {/* Using custom buttons instead of Collapse for more control over styling */}
                <div className="border rounded">
                  <Button
                    type="text"
                    block
                    className="text-start d-flex justify-content-between align-items-center py-3 px-4"
                    onClick={() => togglePanel("1")}
                  >
                    <span className="fw-medium">What is ovulation?</span>
                    <RightOutlined
                      className={`transition ${
                        activeKey.includes("1") ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                  {activeKey.includes("1") && (
                    <div className="p-3">
                      <Paragraph>
                        Ovulation is when one of your ovaries releases an egg.
                        This egg travels down the fallopian tube where it may be
                        fertilized by sperm.
                      </Paragraph>
                    </div>
                  )}
                </div>

                <div className="border rounded">
                  <Button
                    type="text"
                    block
                    className="text-start d-flex justify-content-between align-items-center py-3 px-4"
                    onClick={() => togglePanel("2")}
                  >
                    <span className="fw-medium">When do you ovulate?</span>
                    <RightOutlined
                      className={`transition ${
                        activeKey.includes("2") ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                  {activeKey.includes("2") && (
                    <div className="p-3">
                      <Paragraph>
                        Most women ovulate about 14 days before their period
                        starts. In a typical 28-day cycle, this would be around
                        day 14.
                      </Paragraph>
                    </div>
                  )}
                </div>

                <div className="border rounded">
                  <Button
                    type="text"
                    block
                    className="text-start d-flex justify-content-between align-items-center py-3 px-4"
                    onClick={() => togglePanel("3")}
                  >
                    <span className="fw-medium">
                      How to know when you're ovulating
                    </span>
                    <RightOutlined
                      className={`transition ${
                        activeKey.includes("3") ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                  {activeKey.includes("3") && (
                    <div className="p-3">
                      <Paragraph>
                        You can track your basal body temperature, observe
                        changes in cervical mucus, use ovulation predictor kits,
                        or notice physical symptoms like mild cramping or
                        increased sex drive.
                      </Paragraph>
                    </div>
                  )}
                </div>

                <div className="border rounded">
                  <Button
                    type="text"
                    block
                    className="text-start d-flex justify-content-between align-items-center py-3 px-4"
                    onClick={() => togglePanel("4")}
                  >
                    <span className="fw-medium">
                      What does ovulation feel like?
                    </span>
                    <RightOutlined
                      className={`transition ${
                        activeKey.includes("4") ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                  {activeKey.includes("4") && (
                    <div className="p-3">
                      <Paragraph>
                        Some women experience mild cramping, bloating, breast
                        tenderness, or increased sex drive. Others may not feel
                        anything at all.
                      </Paragraph>
                    </div>
                  )}
                </div>

                <div className="border rounded">
                  <Button
                    type="text"
                    block
                    className="text-start d-flex justify-content-between align-items-center py-3 px-4"
                    onClick={() => togglePanel("5")}
                  >
                    <span className="fw-medium">
                      How long does ovulation last?
                    </span>
                    <RightOutlined
                      className={`transition ${
                        activeKey.includes("5") ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                  {activeKey.includes("5") && (
                    <div className="p-3">
                      <Paragraph>
                        The egg is only viable for about 24 hours after it's
                        released. However, sperm can live in the female
                        reproductive tract for up to 5 days, so your fertile
                        window is about 6 days.
                      </Paragraph>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
