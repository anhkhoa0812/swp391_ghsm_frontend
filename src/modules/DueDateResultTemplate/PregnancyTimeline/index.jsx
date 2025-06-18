import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { SquirrelIcon as Sagittarius, Diamond, Music } from "lucide-react";

function Link({ href, children }) {
    return (
        <a href={href} className="text-primary text-decoration-underline">
            {children}
        </a>
    );
}

const { Title, Text } = Typography;

export default function PregnancyTimeline() {
    return (
        <div className="container bg-white p-4" style={{ maxWidth: "960px" }}>
            <div className="mb-5">
                <Title level={4} className="fw-bold mb-3">
                    Trying to conceive?
                </Title>
                <p>
                    Our <Link href="/ovulation">Ovulation Calculator</Link> will
                    tell you your fertile days and the resulting due dates for
                    the next six cycles.
                </p>
                <p>
                    Also, find out how long it usually takes to conceive, how to{" "}
                    <Link href="#">get pregnant fast</Link>, and the{" "}
                    <Link href="#">top 10 signs of pregnancy</Link>.
                </p>

                {/* App promo */}
                <div className="row bg-light p-3 rounded-3 mt-4 align-items-center">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <p className="fw-semibold mb-2">
                            Track your pregnancy on our free
                        </p>
                        <p className="fw-bold fs-5 mb-3">
                            #1 pregnancy &amp; baby app
                        </p>
                        <img
                            src="/placeholder.svg"
                            alt="QR Code"
                            className="img-fluid"
                            style={{ maxWidth: "128px" }}
                        />
                    </div>
                    <div className="col-md-6 text-center">
                        <img
                            src="/placeholder.svg"
                            alt="App Screenshot"
                            className="img-fluid"
                            style={{ maxWidth: "200px" }}
                        />
                    </div>
                </div>
            </div>

            <Title level={2} className="fw-bold mb-4">
                Pregnancy timeline
            </Title>

            <div className="mb-5">
                <Title level={4} className="text-success mb-1">
                    First Trimester
                </Title>
                <p className="text-muted small mb-4">
                    Mar 13, 2025 to Jun 5, 2025
                </p>

                <div>
                    <TimelineItem
                        month="Mar"
                        day="13"
                        weeks="2 weeks"
                        description={
                            <>
                                Your baby is <Link href="#">conceived</Link>
                            </>
                        }
                    />

                    <TimelineItem
                        month="Mar"
                        day="27"
                        weeks="4 weeks"
                        description={
                            <>
                                You'll have a positive{" "}
                                <Link href="#">pregnancy test</Link>
                            </>
                        }
                    />

                    <TimelineItem
                        month="Apr"
                        day="10"
                        weeks="6 weeks"
                        description={
                            <>
                                Cells in your{" "}
                                <Link href="#">baby's future heart</Link> are
                                flickering
                            </>
                        }
                    />

                    <TimelineItem
                        month="Apr"
                        day="10"
                        weeks="6-8 weeks"
                        description={
                            <>
                                You may have your{" "}
                                <Link href="#">first prenatal visit</Link>
                            </>
                        }
                    />

                    <TimelineItem
                        month="May"
                        day="8"
                        weeks="10 weeks"
                        description={
                            <>
                                You'll be offered <Link href="#">NIPT</Link>{" "}
                                (Noninvasive prenatal test)
                            </>
                        }
                    />

                    <TimelineItem
                        month="May"
                        day="8"
                        weeks="10-13 weeks"
                        description={
                            <>
                                You can choose to have <Link href="#">CVS</Link>{" "}
                                (Chorionic villus sampling)
                            </>
                        }
                    />

                    <TimelineItem
                        month="May"
                        day="15"
                        weeks="11-14 weeks"
                        description={
                            <>
                                You may have an <Link href="#">NT scan</Link>{" "}
                                and blood test
                            </>
                        }
                    />

                    <TimelineItem
                        month="May"
                        day="22"
                        weeks="12 weeks"
                        description={
                            <>
                                You may{" "}
                                <Link href="#">hear your baby's heartbeat</Link>{" "}
                                with a Doppler
                            </>
                        }
                    />
                </div>
            </div>

            <div className="mb-5">
                <Title level={4} className="text-success mb-1">
                    Second Trimester
                </Title>
                <p className="text-muted small mb-4">
                    Jun 5, 2025 to Sep 11, 2025
                </p>

                <div>
                    <TimelineItem
                        month="Jun"
                        day="12"
                        weeks="15-20 weeks"
                        description={
                            <>
                                You may have <Link href="#">amniocentesis</Link>
                            </>
                        }
                    />

                    <TimelineItem
                        month="Jun"
                        day="19"
                        weeks="16-18 weeks"
                        description={
                            <>
                                You may have a <Link href="#">quad scan</Link>{" "}
                                test
                            </>
                        }
                    />

                    <TimelineItem
                        month="Jun"
                        day="19"
                        weeks="16-22 weeks"
                        description={
                            <>
                                You can{" "}
                                <Link href="#">feel your baby kick</Link>
                            </>
                        }
                    />

                    <TimelineItem
                        month="Jul"
                        day="3"
                        weeks="18-22 weeks"
                        description={
                            <>
                                You'll have a mid-pregnancy{" "}
                                <Link href="#">ultrasound</Link>
                            </>
                        }
                    />

                    <TimelineItem
                        month="Aug"
                        day="7"
                        weeks="23 weeks"
                        description={
                            <>
                                Your baby can{" "}
                                <Link href="#">hear you talk</Link>
                            </>
                        }
                    />

                    <TimelineItem
                        month="Aug"
                        day="14"
                        weeks="24-28 weeks"
                        description={
                            <>
                                <Link href="#">glucose screening</Link>
                            </>
                        }
                    />

                    <TimelineItem
                        month="Sep"
                        day="4"
                        weeks="27 weeks"
                        description={
                            <>
                                Your baby will{" "}
                                <Link href="#">open their eyes</Link>
                            </>
                        }
                    />
                </div>
            </div>

            {/* Third Trimester */}
            <div className="mb-5">
                <Title level={4} className="text-success mb-1">
                    Third Trimester
                </Title>
                <p className="text-muted small mb-4">
                    Sep 11, 2025 to Dec 4, 2025
                </p>

                <div>
                    <TimelineItem
                        month="Sep"
                        day="11"
                        weeks="28 weeks"
                        description={
                            <>
                                You'll have{" "}
                                <Link href="#">prenatal visits</Link> every two
                                weeks until 36 weeks, then weekly
                            </>
                        }
                    />

                    <TimelineItem
                        month="Sep"
                        day="11"
                        weeks="28 weeks"
                        description={
                            <>
                                If you're <Link href="#">Rh negative</Link>,
                                you'll have a shot of Rh immune globulin
                                (RhoGAM)
                            </>
                        }
                    />

                    <TimelineItem
                        month="Oct"
                        day="23"
                        weeks="34 weeks"
                        description={
                            <>
                                Your baby has <Link href="#">fingernails</Link>
                            </>
                        }
                    />

                    <TimelineItem
                        month="Nov"
                        day="6"
                        weeks="36-37 weeks"
                        description={
                            <>
                                You'll be screened for{" "}
                                <Link href="#">Group B strep</Link>
                            </>
                        }
                    />

                    <TimelineItem
                        month="Nov"
                        day="13"
                        weeks="37 weeks"
                        description={
                            <>
                                Your baby is <Link href="#">early term</Link>
                            </>
                        }
                    />

                    <TimelineItem
                        month="Nov"
                        day="27"
                        weeks="39 weeks"
                        description={
                            <>
                                Your baby is <Link href="#">full term</Link>
                            </>
                        }
                    />

                    <TimelineItem
                        month="Dec"
                        day="4"
                        weeks="40 weeks / Newborn"
                        description={
                            <>
                                Your baby is <Link href="#">due!</Link>
                            </>
                        }
                    />

                    <TimelineItem
                        month="Dec"
                        day="11"
                        weeks="41 weeks"
                        description={
                            <>
                                If your labor doesn't start, you may be{" "}
                                <Link href="#">induced</Link>
                            </>
                        }
                    />
                </div>
            </div>

            {/* Fun facts section */}
            <div>
                <Title level={4} className="fw-bold mb-4">
                    Fun facts about December 4 babies
                </Title>

                <div className="border-top pt-4 pb-4">
                    <div className="row">
                        <div className="col-auto">
                            <div
                                className="rounded-3 d-flex justify-content-center align-items-center"
                                style={{
                                    backgroundColor: "#1E90FF",
                                    width: 48,
                                    height: 48,
                                }}
                            >
                                <Sagittarius color="#fff" size={24} />
                            </div>
                        </div>
                        <div className="col">
                            <p className="text-primary fw-medium mb-1">
                                Horoscope
                            </p>
                            <h5 className="fw-bold mb-1">Sagittarius</h5>
                            <p>
                                Your little one will be organized, helpful, and
                                intelligent.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-top pt-4 pb-4">
                    <div className="row">
                        <div className="col-auto">
                            <div
                                className="rounded-3 d-flex justify-content-center align-items-center"
                                style={{
                                    backgroundColor: "#4B0082",
                                    width: 48,
                                    height: 48,
                                }}
                            >
                                <Diamond color="#fff" size={24} />
                            </div>
                        </div>
                        <div className="col">
                            <p className="text-primary fw-medium mb-1">
                                Birth stone
                            </p>
                            <h5 className="fw-bold mb-1">Tanzanite</h5>
                            <p>
                                This gemstone features deep blue and purple hues
                                and can only be found in a small region of
                                Tanzania.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-top pt-4 pb-4">
                    <div className="row">
                        <div className="col-auto">
                            <div
                                className="rounded-3 d-flex justify-content-center align-items-center"
                                style={{
                                    backgroundColor: "#FFA500",
                                    width: 48,
                                    height: 48,
                                }}
                            >
                                <Music color="#fff" size={24} />
                            </div>
                        </div>
                        <div className="col">
                            <p className="text-primary fw-medium mb-1">
                                Celebrities Born On December 4
                            </p>
                            <h5 className="fw-bold mb-1">Jay-Z</h5>
                            <p>
                                He was born on December 4, 1969, in New York
                                City. He's one of the world's best-selling
                                musical artists and regarded as one of the
                                greatest rappers of all time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/** TimelineItem component (dùng antd Card + Bootstrap) */
function TimelineItem({ month, day, weeks, description }) {
    return (
        <Card className="mb-3 border-0 shadow-sm">
            <Row gutter={[16, 16]} align="middle">
                {/* Cột hiển thị tháng, ngày */}
                <Col xs={4} sm={3} md={2} className="text-center">
                    <Text type="secondary" className="d-block">
                        {month}
                    </Text>
                    <Title level={4} className="m-0">
                        {day}
                    </Title>
                </Col>

                {/* Cột hiển thị tuần & mô tả */}
                <Col xs={20} sm={21} md={22}>
                    <Text type="secondary" className="small d-block mb-1">
                        {weeks}
                    </Text>
                    <div>{description}</div>
                </Col>
            </Row>
        </Card>
    );
}
