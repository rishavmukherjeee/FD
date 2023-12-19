import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Container from "../components/container";
import Label from "../components/label";

const TermsAndConditions = () => {
  return (
    <Container>
      <Text style={styles.topHeader}>
        Terms and Conditions for Bhojan Mitra Mobile Application:
      </Text>
      <ScrollView
        style={{ flex: 1, padding: 10, marginBottom: 5 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          These terms and conditions ("Terms") govern your access to and use of
          the Bhojan Mitra mobile application ("App") developed by Unicorniz
          Innovations Private Limited for food waste optimization. By
          downloading, installing, or using the App, you agree to be bound by
          these Terms. If you do not agree with these Terms, you must not use
          the App.
        </Text>
        <Text style={styles.header}>License and Restrictions:</Text>

        <Text style={styles.description}>
          a. We grant you a non-exclusive, non-transferable, revocable license
          to use the App for personal, non-commercial purposes, subject to these
          Terms.
        </Text>
        <Text style={styles.description}>b.You shall not:</Text>
        <Text style={styles.description}>
          (i) copy, modify, distribute, sell, or lease the App or any part
          thereof;
        </Text>
        <Text style={styles.description}>
          (ii) reverse engineer, decompile, or disassemble the App or attempt to
          derive its source code;
        </Text>
        <Text style={styles.description}>
          (iii) remove any copyright, trademark, or other proprietary notices
          from the App;
        </Text>
        <Text style={styles.description}>
          (iv) use the App in any way that violates applicable laws or
          regulations or infringes upon the rights of others.
        </Text>
        <Text style={styles.header}>User Account:</Text>
        <Text style={styles.description}>
          a. In order to use certain features of the App, you may be required to
          create a user account. You agree to provide accurate and complete
          information during the registration process and to keep your account
          credentials secure.
        </Text>
        <Text style={styles.description}>
          b. You are solely responsible for any activity that occurs under your
          account. If you become aware of any unauthorized use of your account,
          you must notify us immediately.
        </Text>
        <Text style={styles.header}>Food Listings and Transactions:</Text>
        <Text style={styles.description}>
          a. Bhojan Mitra acts as a platform for users to post listings of
          excess food and connect with potential recipients ("Users").
        </Text>
        <Text style={styles.description}>
          b. Users are responsible for the accuracy and completeness of the
          information provided in their listings.
        </Text>
        <Text style={styles.description}>
          c. Bhojan Mitra does not guarantee the availability, quality, safety,
          or legality of the listed food items or the conduct of users. You
          assume all risks associated with using the App and engaging in
          transactions with other users.
        </Text>
        <Text style={styles.header}>Privacy:</Text>
        <Text style={styles.description}>
          a. We collect and process personal information in accordance with our
          Privacy Policy. By using the App, you consent to the collection, use,
          and disclosure of your personal information as described in the
          Privacy Policy.
        </Text>
        <Text style={styles.header}>Intellectual Property:</Text>
        <Text style={styles.description}>
          a. The App, including its content, features, and underlying
          technology, is protected by copyright, trademark, and other
          intellectual property laws.
        </Text>
        <Text style={styles.description}>
          b. You may not use or display any trademarks, logos, or other
          proprietary information without our prior written consent.
        </Text>
        <Text style={styles.header}>
          Disclaimers and Limitation of Liability:
        </Text>
        <Text style={styles.description}>
          a. The App is provided on an "as is" and "as available" basis. We do
          not warrant that the App will be uninterrupted, error-free, or
          suitable for your specific needs.
        </Text>
        <Text style={styles.description}>
          b. In no event shall we be liable for any indirect, incidental,
          special, consequential, or punitive damages arising out of or in
          connection with your use of the App.
        </Text>
        <Text style={styles.header}>Termination:</Text>
        <Text style={styles.description}>
          a. We may, in our sole discretion, suspend or terminate your access to
          the App at any time and for any reason, without prior notice or
          liability.
        </Text>
        <Text style={styles.header}>Governing Law and Jurisdiction:</Text>
        <Text style={styles.description}>
          a. These Terms shall be governed by and construed in accordance with
          the laws of Indian government.
        </Text>
        <Text style={styles.description}>
          b. Any disputes arising out of or in connection with these Terms shall
          be subject to the exclusive jurisdiction of the courts of India.
        </Text>
        <Text style={styles.header}>Modifications:</Text>
        <Text style={styles.description}>
          a. We reserve the right to modify or update these Terms at any time.
          The updated Terms will be effective upon posting on the App. Your
          continued use of the App after any such changes constitutes your
          acceptance of the modified Terms. Please read these Terms carefully
          before using the Bhojan Mitra mobile application.
        </Text>
        <Text style={styles.description}>
          If you have any questions or concerns, please contact us at:
          <Text
            style={{
              fontFamily: "SemiBold",
              fontSize: 16,
              letterSpacing: 2,
              color: "blue",
            }}
          >
            contact@unicorniz.com
          </Text>
        </Text>
        <Text></Text>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "SemiBold",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
  },
  topHeader: {
    fontFamily: "SemiBold",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  description: {
    fontFamily: "Medium",
    lineHeight: 16,
    letterSpacing: 1,
    marginVertical: 5,
  },
});

export default TermsAndConditions;
