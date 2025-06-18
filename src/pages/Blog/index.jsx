import React, { useState } from "react";
import "./index.css"; // Import CSS từ file index.css
import { Modal, Button } from "react-bootstrap";

export default function BlogPages() {
  // eslint-disable-next-line no-unused-vars
  const [activePost, setActivePost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPost, setModalPost] = useState(null);

  const posts = [
    {
      id: 1,
      title: "Sex Education for Teenagers",
      excerpt:
        "Sex education helps teenagers understand bodies and health better.",
      fullText:
        "Sex education plays a vital role in helping teenagers understand their bodies and health. It provides essential knowledge about puberty, consent in relationships, and sexual health, empowering teens to make informed decisions. Understanding body changes, like sexual organ development, emotional shifts, and menstruation, helps teens embrace these changes naturally.\n\n" +
        "Sex education also teaches the importance of consent in building healthy relationships. It helps teens recognize their rights and responsibilities, fostering mutual respect and preventing abuse. Additionally, it provides knowledge about sexual health, including how to protect against STIs and unwanted pregnancies, and how to reduce risks through safe practices.\n\n" +
        "By learning about sexual health, teens also develop a better understanding of personal boundaries, which is crucial for maintaining healthy relationships. Sex education encourages open conversations about relationships, helping break down stigmas and fostering more positive attitudes toward sexuality. In an increasingly complex world, equipping teenagers with the knowledge they need empowers them to make thoughtful, responsible choices in their lives.\n\n" +
        "Ultimately, sex education empowers teens to make responsible choices, forming healthy habits and relationships that promote their well-being. It's essential for their physical, mental, and social development, leading to a healthier, more responsible life.",
      date: "12/06/2025",
      image: "/blog/01.png", // Hình ảnh chỉ xuất hiện trong phần này
    },
    {
      id: 2,
      title: "Reproductive Health Care for Women",
      excerpt:
        "Explore methods for reproductive health care women at different ages.",
      fullText:
        "Reproductive health care is essential for women at all stages of life. It encompasses a variety of methods and practices to ensure the health and well-being of women’s reproductive systems. From adolescence to menopause, women need to understand their fertility, birth control options, and the importance of regular gynecological exams. As women age, their reproductive needs change, and staying informed about these changes is key to maintaining good health.\n\n" +
        "Throughout the reproductive years, it’s vital to monitor menstrual health and seek professional advice if any irregularities occur. Birth control options, such as the pill, IUDs, implants, and condoms, provide women with the ability to control their reproductive health. Regular check-ups and screenings, including Pap smears and mammograms, are essential for detecting potential health issues early on. As women approach menopause, they should be aware of the changes that affect their body and seek advice on managing symptoms and preventing potential health risks.\n\n" +
        "By maintaining a healthy lifestyle, such as proper nutrition, regular exercise, and stress management, women can improve their reproductive health and overall well-being. Regular visits to healthcare providers ensure that women have access to necessary resources and support, leading to better health outcomes throughout their lives.",
      date: "05/06/2025",
      image: "/blog/02.png",
    },
    {
      id: 3,
      title: "STI Testing and Prevention",
      excerpt:
        "Learn about STI testing methods and how to prevent them effectively.",
      fullText:
        "Sexually transmitted infections (STIs) are a serious health concern worldwide, but many of them are preventable and treatable with early detection. STI testing is vital for maintaining sexual health and preventing the spread of infections. This post covers various testing methods available, including blood tests, urine tests, and swabs, and explains how these tests can detect infections even in their early stages.\n\n" +
        "Early detection of STIs helps prevent complications such as infertility, organ damage, and the transmission of infections to partners. It is crucial for sexually active individuals to get tested regularly, especially those who have multiple partners or engage in unprotected sex. By discussing the importance of safe sex practices, such as the use of condoms and dental dams, this post emphasizes how protection can significantly reduce the risk of transmission.\n\n" +
        "Awareness and education are essential in preventing the spread of STIs. Public health initiatives play a major role in promoting safe sexual practices and encouraging regular screenings. It’s also important to break the stigma surrounding STIs, creating an environment where individuals feel comfortable discussing their sexual health and seeking help when needed.",
      date: "01/06/2025",
      image: "/blog/03.png",
    },
    {
      id: 4,
      title: "Understanding Ovulation and Fertility",
      excerpt:
        "An introduction to ovulation and how it relates to fertility and conception.",
      fullText:
        "Understanding ovulation and fertility is crucial for anyone trying to conceive or avoid pregnancy. Ovulation is the process where an egg is released from the ovaries, and knowing when this occurs can help individuals plan for conception or use fertility awareness methods for contraception. This post explains the science behind ovulation and its connection to fertility.\n\n" +
        "Tracking ovulation is an effective way to predict fertile windows. By understanding changes in cervical mucus, basal body temperature, and using ovulation predictor kits, individuals can better understand their cycle and improve their chances of conception. For those trying to prevent pregnancy, this knowledge also provides a natural family planning method. However, it is important to recognize that ovulation is not always predictable, and factors such as stress, illness, and hormonal imbalances can affect the cycle.\n\n" +
        "In addition, there are lifestyle factors that can influence fertility, such as maintaining a healthy weight, eating a balanced diet, reducing stress, and avoiding smoking or excessive alcohol use. Couples who are struggling with infertility should consult a healthcare professional for advice and explore options such as fertility treatments or assisted reproductive technologies.",
      date: "20/05/2025",
      image: "/blog/04.png",
    },
    {
      id: 5,
      title: "Birth Control Methods Explained",
      excerpt: "A guide to different birth control methods available to women.",
      fullText:
        "Choosing the right birth control method is a personal decision that depends on individual health, lifestyle, and reproductive goals. This article explains the most common birth control methods available to women, both hormonal and non-hormonal, and helps women understand their options.\n\n" +
        "Hormonal methods, such as birth control pills, patches, injections, and IUDs, work by regulating hormones to prevent ovulation, thicken cervical mucus, and thin the uterine lining. While highly effective, these methods may have side effects such as weight gain, mood changes, or changes in menstrual cycles. Non-hormonal options, including condoms, diaphragms, and copper IUDs, provide barrier protection and are ideal for those who prefer a hormone-free option.\n\n" +
        "This article also discusses permanent methods of contraception, such as sterilization, which is a safe and effective choice for individuals who do not wish to have children in the future. It’s important for women to have open discussions with their healthcare providers to determine the best option based on their medical history, lifestyle, and preferences. Birth control is a vital tool for women’s health and empowerment, giving them the ability to plan their reproductive futures.",
      date: "15/05/2025",
      image: "/blog/05.png",
    },
    {
      id: 6,
      title: "Menstrual Health Awareness",
      excerpt:
        "Learn about menstrual health and the importance of regular check-ups.",
      fullText:
        "Menstrual health is an important aspect of women’s overall well-being. Understanding menstrual cycles, recognizing signs of irregularities, and knowing when to seek medical help are all key factors in maintaining good health. This post discusses how menstrual cycles work and the typical symptoms women experience during menstruation.\n\n" +
        "Irregular periods can be a sign of an underlying health issue, such as polycystic ovary syndrome (PCOS), thyroid disorders, or stress. Regular check-ups with a gynecologist can help detect any potential issues early and ensure that women receive the proper care and treatment. It’s also essential for women to manage menstrual symptoms, such as cramps, bloating, and fatigue, by using pain relief methods, exercising, and maintaining a healthy diet.\n\n" +
        "Menstrual health awareness also involves understanding the different types of menstrual products available, such as pads, tampons, menstrual cups, and period underwear. These products allow women to manage their menstruation in a way that suits their lifestyle, ensuring comfort and convenience during their period.",
      date: "10/05/2025",
      image: "/blog/06.png",
    },
    {
      id: 7,
      title: "The Importance of Sexual Consent",
      excerpt: "Why understanding and practicing sexual consent is essential.",
      fullText:
        "Sexual consent is a fundamental component of any healthy sexual relationship. It ensures that both partners are willing and enthusiastic participants in sexual activity. This article explains what consent means, why it’s necessary, and how to ensure that both parties are comfortable and respect each other’s boundaries.\n\n" +
        "Consent is not only about saying ‘yes’ or ‘no,’ but also about ongoing communication throughout the sexual encounter. It’s important to understand that consent can be revoked at any time, and both parties should always feel free to express their feelings and desires openly. This concept is crucial in fostering respect, trust, and mutual satisfaction in relationships.\n\n" +
        "Sexual consent also plays a significant role in preventing sexual violence and abuse. By educating individuals about the importance of consent, society can reduce the prevalence of sexual assault and create a safer environment for everyone. Understanding and practicing consent is essential for building healthy relationships based on respect and equality.",
      date: "02/05/2025",
      image: "/blog/07.png",
    },
    {
      id: 8,
      title: "Mental Health and Sexual Wellness",
      excerpt: "How mental health affects sexual wellness and vice versa.",
      fullText:
        "Mental health and sexual wellness are closely linked, and one can significantly affect the other. Anxiety, depression, and stress can impact a person’s desire and ability to engage in sexual activity, while poor sexual health can also contribute to mental health issues. This post explores the relationship between mental health and sexual wellness, highlighting the importance of a holistic approach to well-being.\n\n" +
        "Mental health conditions, such as anxiety and depression, can lead to a decreased libido, sexual dysfunction, and challenges in maintaining healthy relationships. On the other hand, sexual issues, such as pain during intercourse or low sexual desire, can lead to feelings of frustration, isolation, or depression. It’s essential to address both mental and sexual health to achieve overall well-being.\n\n" +
        "Seeking professional help when necessary, practicing open communication in relationships, and adopting healthy lifestyle habits such as regular exercise and stress management techniques are important steps toward improving both mental health and sexual wellness. By understanding this connection, individuals can lead healthier, more fulfilling lives.",
      date: "25/04/2025",
      image: "/blog/08.png",
    },
    {
      id: 9,
      title: "Sex Education and Its Importance",
      excerpt: "Why sex education is an essential part of everyone's life.",
      fullText:
        "Sex education plays a crucial role in helping individuals understand their bodies, relationships, and the rights related to their gender. It provides individuals with knowledge about body changes, sexual health, and how to protect themselves from sexual abuse. This is especially important for teenagers, as they begin to experience physical and emotional changes during adolescence.\n\n" +
        "One of the main benefits of sex education is its ability to teach about sexual consent, which is essential for building healthy, respectful relationships. It helps individuals understand their rights and responsibilities, thus preventing abuse and fostering mutual respect in relationships. Additionally, it teaches about safe sex practices, including contraception methods and the prevention of sexually transmitted infections (STIs), reducing the risks associated with unprotected sex.\n\n" +
        "Sex education also empowers individuals to make informed decisions regarding their sexual health, helping them build self-respect and establish personal boundaries. It promotes open communication about relationships, helping to break down stigmas around sexuality and fostering positive attitudes. In a world that is becoming increasingly complex, equipping teenagers with the necessary knowledge enables them to make responsible, thoughtful decisions about their lives.\n\n" +
        "Ultimately, sex education helps individuals form healthy habits and relationships, promoting physical, mental, and social well-being. It is an essential tool for their development, leading to a healthier and more responsible life.",
      date: "01/07/2025",
      image: "/blog/09.png",
    },
    {
      id: 10,
      title: "Reproductive Health & Check-ups",
      excerpt: "Benefits of reproductive health care and check-ups.",
      fullText:
        "Reproductive health care is vital for women at all stages of life. It includes various methods and practices to ensure the health and well-being of women's reproductive systems. From adolescence to menopause, women need to understand their fertility, birth control options, and the importance of regular gynecological exams. As women age, their reproductive health needs change, and staying informed is key to maintaining good health.\n\n" +
        "During the reproductive years, monitoring menstrual health is crucial. Women should seek professional advice if any irregularities occur. Birth control options such as pills, IUDs, implants, and condoms provide women with the ability to control their reproductive health. Regular check-ups and screenings, including Pap smears and mammograms, are essential for early detection of potential health issues. As women approach menopause, they should understand the changes affecting their bodies and seek advice on managing symptoms and preventing health risks.\n\n" +
        "By maintaining a healthy lifestyle, such as proper nutrition, regular exercise, and stress management, women can improve their reproductive health and overall well-being. Regular visits to healthcare providers ensure that women have access to necessary resources and support, leading to better health outcomes throughout their lives.",
      date: "05/07/2025",
      image: "/blog/10.png",
    },
  ];

  const handleOpenModal = (post) => {
    setModalPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalPost(null);
  };

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Blog Sharing Knowledge</h1>
        <p>
          Sharing insights about sex education, reproductive health care, and
          sexual wellness.
        </p>
      </div>

      <div className="blog-posts">
        {posts.map((post) => (
          <div className="blog-card" key={post.id}>
            <div className="blog-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-content">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="blog-date">{post.date}</span>
              <button
                className="view-full"
                onClick={() => handleOpenModal(post)}
              >
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {/* Modal */}
      {isModalOpen && modalPost && (
        <Modal show={isModalOpen} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            {" "}
            {/* Sử dụng closeButton từ React-Bootstrap */}
            <Modal.Title>{modalPost.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Our Commitment</h4>
            <p>{modalPost.fullText}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
