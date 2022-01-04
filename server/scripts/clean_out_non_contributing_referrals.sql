delete from referrals where referral_id in (select referral_id from (select referral_id, count(*) from referrals group by referral_id having count(*) = 1) abc);
