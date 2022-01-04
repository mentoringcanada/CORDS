
-- up
CREATE INDEX referral_id_idx ON referrals (referral_id);
CREATE INDEX referral_services_idx ON referrals (service_id);


--down
-- DROP INDEX referral_id_idx;
-- DROP INDEX referral_services_idx;