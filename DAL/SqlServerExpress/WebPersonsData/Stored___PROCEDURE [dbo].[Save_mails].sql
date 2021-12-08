USE [WebPersonData]
GO
/****** Object:  StoredProcedure [dbo].[Save_Mail]    Script Date: 03/12/2021 11:08:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Victor>
-- ALTER date: <03/12/2021>
-- Description:	<save Mail >
-- =============================================
create PROCEDURE [dbo].[Save_Email]
@ID int OUTPUT ,
@Email nvarchar(100),
@Remark nvarchar(100)

AS
BEGIN
	DECLARE @err int,
			@TempID int
	IF isnull(@ID ,0)<1
		BEGIN
			Select @TempID = Count  (Id ) FROM [dbo].[Emails] 
			if @TempID > 0
			SELECT @TempID = MAX ([dbo].[Emails].Id ) FROM [dbo].[Emails]
			SET @TempID = @TempID + 1
			INSERT INTO [dbo].[Emails]
			(
				[Email]		 ,
				[Remark]	
			)
			VALUES
			(
				@Email,
				@Remark 
			)
			SELECT @err = coalesce(nullif(@err, 0), @@error)

			SET @ID = @TempID

			IF (@err = 0)
				BEGIN
					SET @ID = @TempID
				END
		END
	ELSE
		BEGIN
			UPDATE [dbo].[Emails]
			SET [Email]		 = @EMail,
				[Remark]	 = @Remark

			WHERE [Emails].[Id] = @ID
			SELECT @err = coalesce(nullif(@err, 0), @@error)
		END
	RETURN @err
END

